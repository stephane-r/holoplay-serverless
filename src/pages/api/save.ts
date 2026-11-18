import type { NextApiRequest, NextApiResponse } from "next";
import { withCors } from "@/utils/withCors";
import { createSyncCode } from "@/utils/cache";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

type Data = {
  code: string;
};

export default withCors(["POST"], async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const code = await createSyncCode(req.body);

  res.status(200).json({ code });
});
