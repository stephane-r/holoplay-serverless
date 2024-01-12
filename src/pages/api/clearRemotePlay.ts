import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { runMiddleware } from "@/utils/runMiddleware";
import { CacheKeys, cache, getCachedDevices } from "@/utils/cache";
import { Device } from "@/interfaces/Device";

const cors = Cors({
  methods: ["GET"],
  origin: "*",
});

type GetData = {
  videoId: string;
};

type PostData = {
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostData | { data: Device | null }>
) {
  await runMiddleware(req, res, cors);

  const cachedDevices = getCachedDevices();

  if (!cachedDevices) {
    return res.send({ ok: false });
  }

  cache.set(
    CacheKeys.devices,
    JSON.stringify(
      cachedDevices.filter(
        (device) => device.deviceUuid !== req.body.deviceUuid
      )
    )
  );
  res.send({ ok: true });
}
