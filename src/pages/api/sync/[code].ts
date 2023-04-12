import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { runMiddleware } from "@/utils/runMiddleware";
import { cache } from "@/utils/cache";
import { Key } from "node-cache";

const cors = Cors({
  methods: ["GET"],
  origin: "*",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  await runMiddleware(req, res, cors);
  const data = cache.get(req.query.code as Key) as string;

  if (!data) {
    res.status(404).send("Not found");
    return;
  }

  res.send(data);
}
