import { SponsorBlock, Category, Constants } from "sponsorblock-api";
import { NextApiRequest, NextApiResponse } from "next";
import { withCors } from "@/utils/withCors";

type Data = {
  segments?: any;
  error?: string;
};

export default withCors(["POST"], async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!req.query.deviceId || !req.query.videoId) {
    res.status(400).json({ error: "Missing deviceId or videoId" });
    return;
  }

  try {
    const sponsorBlock = new SponsorBlock(req.query.deviceId as string);

    const segments = await sponsorBlock.getSegments(
      req.query.videoId as string,
      ((req.query.categories as string)?.split(",") as Category[]) ??
        Constants.ALL_CATEGORIES
    );

    res.status(200).json({ segments });
  } catch {
    res.status(200).json({ segments: [] });
  }
});
