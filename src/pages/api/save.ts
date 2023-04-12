import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import Cors from "cors";
import { runMiddleware } from "@/utils/runMiddleware";

const cors = Cors({
  methods: ["POST"],
  origin: "*",
});

type Data = {
  code: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);

  const code = Math.floor(Math.random() * 900000);

  await fs.mkdir(`${__dirname}/data`, { recursive: true });

  const filePath = `${__dirname}/data/${code}.json`;
  await fs.writeFile(filePath, JSON.stringify(req.body), "utf8");

  res.status(200).json({ code });
}
