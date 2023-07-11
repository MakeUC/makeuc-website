import { Router } from "express";
import fileUploadMiddleware from "express-fileupload";
import { z } from "zod";


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

export { utilitiesRouter };
