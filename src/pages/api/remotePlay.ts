import type { NextApiRequest, NextApiResponse } from "next";
import { withCors } from "@/utils/withCors";
import { getDevice, setDevice } from "@/utils/cache";
import { Device } from "@/interfaces/Device";

type PostData = {
  ok: boolean;
};

export default withCors(["GET", "POST"], async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostData | { data: Device | null }>
) {
  if (req.method === "POST") {
    return post(req, res);
  } else if (req.method === "GET") {
    return get(req, res);
  } else {
    throw new Error("Method not allowed");
  }
});

const post = async (
  req: NextApiRequest,
  res: NextApiResponse<PostData>
) => {
  await setDevice(req.body.deviceUuid, req.body.videoId);
  res.send({ ok: true });
};

const get = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data: Device | null }>
) => {
  const device = await getDevice(req.query.deviceUuid as string);
  res.send({ data: device ?? null });
};
