import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
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

  const filePath = `${path.join(__dirname, "../")}/data/${req.query.code}.json`;
  const data = await fs.readFile(filePath, "utf8");
  res.send(data);
}
