import fs from "fs";
import path from "path";

import type { Request, Response } from "express";


export function countriesHandler(req: Request, res: Response) {
  const filePath = path.resolve(__dirname, "../../../../data/countriesminified.json");
  const stream = fs.createReadStream(filePath, { encoding: "utf-8" });
  res.setHeader("Content-Type", "application/json");
  stream.pipe(res);
}
