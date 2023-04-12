import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { runMiddleware } from "@/utils/runMiddleware";
import { writeFile } from "fs/promises";

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
  await writeFile(`public/data/${code}.json`, JSON.stringify(req.body), "utf8");

  res.status(200).json({ code });
}
