import { SponsorBlock, Category, Constants } from "sponsorblock-api";
import Cors from "cors";
import { runMiddleware } from "@/utils/runMiddleware";
import { NextApiRequest, NextApiResponse } from "next";

const cors = Cors({
  methods: ["POST"],
  origin: "*",
});

type Data = {
  segments?: any;
  error?: string;
};

interface Query {
  deviceId: string;
  videoId: string;
  categories?: Category[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);

  if (!req.query.deviceId || !req.query.videoId) {
    res.status(400).json({ error: "Missing deviceId or videoId" });
  }

  try {
    const sponsorBlock = new SponsorBlock(req.query.deviceId as string);

    const segments = await sponsorBlock.getSegments(
      req.query.videoId as string,
      ((req.query.categories as string).split(",") as Category[]) ??
        Constants.ALL_CATEGORIES
    );

    res.status(200).json({ segments });
  } catch {
    res.status(200).json({ segments: [] });
  }
}
