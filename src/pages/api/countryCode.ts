import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { runMiddleware } from "@/utils/runMiddleware";

const cors = Cors({
  methods: ["GET"],
  origin: "*",
});

type Data = {
  countryCode: string | null;
};

type Geo = {
  city?: string;
  country?: string;
  region?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);

  // @ts-ignore
  const geo = req.geo as Geo;

  res.status(200).json({ countryCode: geo?.region ?? null });
}
