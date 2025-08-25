import fs from "fs";
import path from "path";

import type { Request, Response } from "express";


export function citiesHandler(req: Request, res: Response) {
  const filePath = path.resolve(__dirname, "data/citiesminified.json");
  const stream = fs.createReadStream(filePath, { encoding: "utf-8" });
  res.setHeader("Content-Type", "application/json");
  stream.pipe(res);
}
