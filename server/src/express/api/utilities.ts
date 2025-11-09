import { spawn } from "child_process";

import archiver from "archiver";
import { parse } from "csv-parse/sync";
import { Router } from "express";
import fileUploadMiddleware from "express-fileupload";
import { z } from "zod";

import { Role, ensureHasRole } from "./roles";

import type { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";


const registrantJsonFile = z.array(z.object({
  mlhCodeOfConductAgreement: z.literal<boolean>(true),
  mlhPrivacyPolicyAgreement: z.literal<boolean>(true),
  mlhEmailAgreement: z.boolean().optional(),
  registrationYear: z.number().int().optional(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  school: z.string(),
  country: z.string(),
  degree: z.string(),
  major: z.string(),
  expectedGraduationYear: z.number().int(),
  hackathonsAttended: z.number().int(),
  ethnicity: z.string(),
  age: z.number().int(),
  gender: z.string(),
  notes: z.string().optional(),
  createdAt: z.string().datetime(),
  resumeUrl: z.string().optional(),
  verified: z.boolean().optional(),
}));

const utilitiesRouter = Router();

utilitiesRouter.post("/import-registrants", fileUploadMiddleware(), async (req, res) => {
  if (!req.context.session) return res.sendStatus(403);

  const file_ = req.files?.file;
  const file = Array.isArray(file_) ? file_[0] : file_;

  if (!file) return res.status(400).send("File not attached");

  let fileObj;

  try {
    const fileStr = file.data.toString("utf-8");
    fileObj = JSON.parse(fileStr);
  } catch {
    return res.status(400).send("Failed to parse the data.");
  }
  const result = registrantJsonFile.safeParse(fileObj);

  if (!result.success) { return res.status(400).send(result.error); }

  const registrantData = result.data;

  const foundSchools = new Map<string, string>();
  const missingSchools = new Set<string>();

  async function findSchools() {
    for (const registrant of registrantData) {
      const schoolName = registrant.school;

      if (foundSchools.has(schoolName)) { continue; }

      const schoolIds: { id: string }[] = await req.context.prisma.$queryRaw`
        SELECT
          id
        FROM
          "School"
        WHERE
          SIMILARITY(name, ${schoolName}) > 0.45
        ORDER BY
          SIMILARITY(name, ${schoolName}) DESC
        LIMIT 1;
      `;
      if (schoolIds.length === 0) {
        missingSchools.add(schoolName);
      } else {
        foundSchools.set(schoolName, schoolIds[0].id);
      }
    }
  }

  await findSchools();

  // Create the missing schools
  await req.context.prisma.school.createMany({
    data: [...missingSchools].map(school => ({
      name: school,
      city: "Unknown",
      state: "Unknown",
      county: "Unknown",
      country: "Unknown",
      alias: school,
    })),
  });

  await findSchools();

  // If the schools weren't created, throw error
  if (missingSchools.size > 0) { return res.status(500).send(`Missing Schools!: ${JSON.stringify([...missingSchools].sort())}`); }

  try {
    await req.context.prisma.registrant.createMany({
      data: registrantData.map(({ createdAt: _, phone: _phone, school, ...registrant }) => ({
        ...registrant,
        schoolId: foundSchools.get(school),
        emailRegistrationYearCompoundKey: `${registrant.email}-${registrant.registrationYear}`,
      })),
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send(err.message);
    }
    return res.status(500).send(JSON.stringify(err));
  }

  res.sendStatus(200);
});

const projectCSVSchema = z.array(z.object({
  name: z.string(),
  devpost: z.string(),
  group: z.string(),
}));

utilitiesRouter.post("/import-projects", fileUploadMiddleware(), async (req, res) => {
  if (!req.context.session) return res.sendStatus(403);

  const file_ = req.files?.file;
  const file = Array.isArray(file_) ? file_[0] : file_;

  if (!file) return res.status(400).send("File not attached");

  let fileObj;

  try {
    fileObj = parse(file.data, { columns: true, skip_empty_lines: true });
  } catch {
    return res.status(400).send("Failed to parse the data.");
  }

  const result = projectCSVSchema.safeParse(fileObj);

  if (!result.success) { return res.status(400).send(result.error); }

  return req.context.prisma.project.createMany({
    data: result.data.map(data => ({
      name: data.name,
      url: data.devpost,
      judgingGroup: parseInt(data.group),
      year: new Date().getFullYear(),
    })),
  })
    .catch(err => res.status(400).send(err));
});




utilitiesRouter.get("/export-all", async (req: Request, res: Response) => {
  try {
    if (!ensureHasRole(req, res, [Role.Admin])) return;


    const dbUrl = process.env.POSTGRES_PRISMA_URL;
    if (!dbUrl) {
      return res.status(500).send("POSTGRES_PRISMA_URL environment variable is missing.");
    }

    // Extract database name for filename
    let dbName = "database";
    try {
      const match = dbUrl.match(/\/([^/?]+)(\?|$)/);
      if (match && match[1]) dbName = match[1];
    } catch (e) {
      // ignore errors in db name extraction
    }

    const timestamp = new Date().toISOString().slice(0, 19).replace("T", "_").replace(/:/g, "-");
    const filename = `keystone_db_backup_${dbName}_${timestamp}.sql`;

    res.setHeader("Content-Type", "application/sql");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    // Use pg_dump with connection string
    const pgDumpProcess = spawn("pg_dump", [dbUrl]);
    pgDumpProcess.stdout.pipe(res);

    pgDumpProcess.on("close", code => {
      if (code !== 0) {
        if (!res.headersSent) {
          res.status(500).end("Database backup failed. Check server logs.");
        }
      } else {
        // eslint-disable-next-line no-console
        console.log("Database backup streamed successfully.");
      }
      if (!res.writableEnded) {
        res.end();
      }
    });

  } catch (e) {
    if (!res.headersSent) {
      res.status(500).send("An internal error occurred.");
    }
  }
});


async function computeNormalizedScores(prisma: PrismaClient) {
  interface Track { id: string; name?: string }
  interface JudgementWithRelations {
    id: string;
    projectId?: string | null;
    project?: { name?: string } | null;
    judgeId?: string | null;
    judge?: { name?: string } | null;
    overallScore?: number | null;
    conceptCaliber?: number | null;
    implementationAttempt?: number | null;
    demonstrationAbility?: number | null;
    presentationProfessionalism?: number | null;
    applicableTracks?: Track[] | null;
    disqualifiedById?: string | null;
    disqualifyReason?: string | null;
  }
  async function _findAll() {
    return prisma.judgement.findMany({
      where: {
        projectId: { not: null },
        disqualifiedById: null,
        disqualifyReason: "",
      },
      include: {
        project: true,
        applicableTracks: true,
        judge: true,
      },
    }) as unknown as JudgementWithRelations[];
  }

  // load judgements with related project and tracks, exclude disqualified entries
  const judgements = await _findAll();

  // Keep only entries with an overallScore
  const scored = judgements.filter(j => typeof j.overallScore === "number" && !Number.isNaN(j.overallScore));

  const allScores = scored.map(s => s.overallScore as number);
  const globalMean = allScores.reduce((a: number, b: number) => a + b, 0) / (allScores.length || 1);
  const globalVar = allScores.reduce((a: number, b: number) => a + Math.pow(b - globalMean, 2), 0)
    / (allScores.length || 1);
  const globalStd = Math.sqrt(globalVar) || 1;

  // per-judge stats
  const judgeMap = new Map<string, { scores: number[] }>();
  for (const j of scored) {
    const judgeId = j.judgeId || "__unknown__";
    let entry = judgeMap.get(judgeId);
    if (!entry) {
      entry = { scores: [] };
      judgeMap.set(judgeId, entry);
    }
    entry.scores.push(j.overallScore as number);
  }

  const judgeStats = new Map<string, { mean: number; std: number }>();
  for (const [judgeId, { scores }] of judgeMap.entries()) {
    const mean = scores.reduce((a, b) => a + b, 0) / (scores.length || 1);
    const variance = scores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (scores.length || 1);
    const std = Math.sqrt(variance) || 0;
    judgeStats.set(judgeId, { mean, std });
  }

  // weighted calculations per judgement
  const weightedCalculations = scored.map(j => {
    const judgeId = j.judgeId || "__unknown__";
    const stats = judgeStats.get(judgeId) || { mean: 0, std: 0 };
    const orig = j.overallScore as number;
    const stdForZ = stats.std || 1; // avoid div by zero
    const z = (orig - stats.mean) / stdForZ;
    const normalized = globalMean + z * globalStd;
    const trackIds = (j.applicableTracks || []).map((t: { id: string }) => t.id).join("|");
    const trackNames = (j.applicableTracks || []).map((t: { name?: string }) => t.name || "").join("|");
    return {
      judgementId: j.id,
      projectId: j.projectId,
      projectName: j.project?.name || "",
      judgeId,
      judgeName: j.judge?.name || "",
      originalScore: orig,
      judgeMean: stats.mean,
      judgeStd: stats.std,
      zscore: z,
      normalizedScore: normalized,
      trackIds,
      trackNames,
    };
  });

  // per-project per-track aggregations
  interface ProjectTrackEntry {
    projectId: string;
    projectName: string;
    trackId: string;
    trackName: string;
    scores: number[];
  }
  const projectTrackMap = new Map<string, ProjectTrackEntry>();
  for (const wc of weightedCalculations) {
    const trackNames = wc.trackNames ? wc.trackNames.split("|") : [];
    const trackIds = wc.trackIds ? wc.trackIds.split("|") : [];
    for (let i = 0; i < trackIds.length; i++) {
      const trackId = trackIds[i] || "";
      const trackName = trackNames[i] || "";
      const key = `${wc.projectId}::${trackId}`;
      if (!projectTrackMap.has(key)) {
        projectTrackMap.set(key, { projectId: wc.projectId || "", projectName: wc.projectName || "", trackId, trackName, scores: [] });
      }
      const entry = projectTrackMap.get(key);
      if (entry) {
        entry.scores.push(wc.normalizedScore);
      }
    }
  }

  const projectTrackTotals = [...projectTrackMap.values()].map(x => ({
    projectId: x.projectId,
    projectName: x.projectName,
    trackId: x.trackId,
    trackName: x.trackName,
    averageNormalizedScore: x.scores.reduce((a, b) => a + b, 0) / (x.scores.length || 1),
    numJudgements: x.scores.length,
  }));

  return { raw: judgements, weightedCalculations, projectTrackTotals };
}

function objectsToCSV(rows: Record<string, unknown>[], columns?: string[]) {
  if (!rows || rows.length === 0) {
    return "";
  }
  const cols = columns || Object.keys(rows[0]);
  const escape = (v: unknown) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    if (s.includes("\"") || s.includes(",") || s.includes("\n")) {
      return "\"" + s.replace(/"/g, "\"\"") + "\"";
    }
    return s;
  };
  const header = cols.join(",") + "\n";
  const lines = rows.map(r => cols.map(c => escape((r as Record<string, unknown>)[c])).join(",")).join("\n");
  return header + lines;
}

utilitiesRouter.get("/calculate-winners/:file", async (req: Request, res: Response) => {
  try {
    if (!ensureHasRole(req, res, [Role.Organizer, Role.Admin])) return;

    const file = req.params.file || "totals";

    // If the caller only wants the raw judgement data, skip the normalization
    // and heavy calculations for efficiency and just fetch the raw rows.
    if (file === "raw") {
      const rawJudgements = await req.context.prisma.judgement.findMany({
        where: {
          projectId: { not: null },
          disqualifiedById: null,
          disqualifyReason: "",
        },
        include: {
          project: true,
          applicableTracks: true,
          judge: true,
        },
      });

      const csv = objectsToCSV(rawJudgements.map(r => ({
        id: r.id,
        projectId: r.projectId,
        projectName: r.project?.name || "",
        judgeId: r.judgeId,
        judgeName: r.judge?.name || "",
        conceptCaliber: r.conceptCaliber,
        implementationAttempt: r.implementationAttempt,
        demonstrationAbility: r.demonstrationAbility,
        presentationProfessionalism: r.presentationProfessionalism,
        overallScore: r.overallScore,
        disqualifyReason: r.disqualifyReason,
        trackNames: (r.applicableTracks || []).map(t => t.name || "").join("|"),
      })));
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="judgements_raw_${new Date().toISOString().slice(0, 19).replace("T", "_").replace(/:/g, "-")}.csv"`);
      return res.send(csv);
    }

    const { raw, weightedCalculations, projectTrackTotals } = await computeNormalizedScores(req.context.prisma);

    // If the caller requested an individual CSV, still support it for backward-compatibility
    const timestamp = new Date().toISOString().slice(0, 19).replace("T", "_").replace(/:/g, "-");

    if (file === "raw") {
      const csv = objectsToCSV(raw.map(r => ({
        id: r.id,
        projectId: r.projectId,
        projectName: r.project?.name || "",
        judgeId: r.judgeId,
        judgeName: r.judge?.name || "",
        conceptCaliber: r.conceptCaliber,
        implementationAttempt: r.implementationAttempt,
        demonstrationAbility: r.demonstrationAbility,
        presentationProfessionalism: r.presentationProfessionalism,
        overallScore: r.overallScore,
        disqualifyReason: r.disqualifyReason,
        trackNames: (r.applicableTracks || []).map(t => t.name || "").join("|"),
      })));
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="judgements_raw_${timestamp}.csv"`);
      return res.send(csv);
    }

    if (file === "weighted") {
      const csv = objectsToCSV(weightedCalculations.map(w => ({
        judgementId: w.judgementId,
        projectId: w.projectId,
        projectName: w.projectName,
        judgeId: w.judgeId,
        judgeName: w.judgeName,
        originalScore: w.originalScore,
        judgeMean: w.judgeMean,
        judgeStd: w.judgeStd,
        zscore: w.zscore,
        normalizedScore: w.normalizedScore,
        trackNames: w.trackNames,
      })));
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="judgements_weighted_${timestamp}.csv"`);
      return res.send(csv);
    }

    // For totals, create a ZIP containing all three CSVs (totals, weighted, raw)
    if (file === "totals") {
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", `attachment; filename="judgements_export_${timestamp}.zip"`);

      const archive = archiver("zip", { zlib: { level: 9 } });
      archive.on("error", (err: Error) => {
        // eslint-disable-next-line no-console
        console.error("Archiver error:", err);
        if (!res.headersSent) res.status(500).end("Error creating ZIP");
      });

      archive.pipe(res);

      const totalsCSV = objectsToCSV(projectTrackTotals.map(t => ({
        projectId: t.projectId,
        projectName: t.projectName,
        trackId: t.trackId,
        trackName: t.trackName,
        averageNormalizedScore: t.averageNormalizedScore,
        numJudgements: t.numJudgements,
      })));

      const weightedCSV = objectsToCSV(weightedCalculations.map(w => ({
        judgementId: w.judgementId,
        projectId: w.projectId,
        projectName: w.projectName,
        judgeId: w.judgeId,
        judgeName: w.judgeName,
        originalScore: w.originalScore,
        judgeMean: w.judgeMean,
        judgeStd: w.judgeStd,
        zscore: w.zscore,
        normalizedScore: w.normalizedScore,
        trackNames: w.trackNames,
      })));

      const rawCSV = objectsToCSV(raw.map(r => ({
        id: r.id,
        projectId: r.projectId,
        projectName: r.project?.name || "",
        judgeId: r.judgeId,
        judgeName: r.judge?.name || "",
        conceptCaliber: r.conceptCaliber,
        implementationAttempt: r.implementationAttempt,
        demonstrationAbility: r.demonstrationAbility,
        presentationProfessionalism: r.presentationProfessionalism,
        overallScore: r.overallScore,
        disqualifyReason: r.disqualifyReason,
        trackNames: (r.applicableTracks || []).map(t => t.name || "").join("|"),
      })));

      archive.append(totalsCSV, { name: `project_totals_${timestamp}.csv` });
      archive.append(weightedCSV, { name: `judgements_weighted_${timestamp}.csv` });
      archive.append(rawCSV, { name: `judgements_raw_${timestamp}.csv` });

      await archive.finalize();
      return;
    }

  } catch (e) {
    if (!res.headersSent) {
      res.status(500).send("An internal error occurred while calculating winners.");
    }
  }
});


export { utilitiesRouter };
