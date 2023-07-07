import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { runMiddleware } from "@/utils/runMiddleware";
import { cache } from "@/utils/cache";
// @ts-ignore
import { lookup } from "geoip-lite";

const cors = Cors({
  methods: ["GET"],
  origin: "*",
});

type Data = {
  countryCode: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);

  const ip = req.headers["x-forwarded-for"];
  const geoip = lookup(ip);

  res.status(200).json({ countryCode: geoip?.country ?? null });
}
