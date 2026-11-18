import type { NextApiRequest, NextApiResponse } from "next";
import { withCors } from "@/utils/withCors";
import { getSyncPayload } from "@/utils/cache";

export default withCors(["GET"], async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const payload = await getSyncPayload(req.query.code as string);

  if (!payload) {
    res.status(404).send("Not found");
    return;
  }

  res.status(200).json(payload);
});
