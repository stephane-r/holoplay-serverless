import type { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "fs/promises";
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
  const data = await readFile(`/tmp/${req.query.code}.json`, "utf8");

  res.send(data);
}
