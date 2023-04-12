import type { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "fs/promises";
import path from "path";
import Cors from "cors";
import { runMiddleware } from "@/utils/runMiddleware";

const cors = Cors({
  methods: ["GET"],
  origin: "*",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  await runMiddleware(req, res, cors);

  const file = path.join(process.cwd(), "data", `${req.query.code}.json`);
  const data = await readFile(file, "utf8");
  res.send(data);
}
