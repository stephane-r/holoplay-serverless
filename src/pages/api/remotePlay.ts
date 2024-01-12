import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { runMiddleware } from "@/utils/runMiddleware";
import {
  CacheKeys,
  cache,
  cacheDevices,
  getCachedDevice,
  getCachedDevices,
} from "@/utils/cache";
import { Device } from "@/interfaces/Device";

const cors = Cors({
  methods: ["GET"],
  origin: "*",
});

type PostData = {
  ok: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostData | { data: Device | null }>
) {
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    return post(req, res);
  } else if (req.method === "GET") {
    return get(req, res);
  } else {
    throw new Error("Method not allowed");
  }
}

const post = (req: NextApiRequest, res: NextApiResponse) => {
  const cachedDevices = getCachedDevices();

  if (!cachedDevices) {
    cacheDevices([
      {
        deviceUuid: req.body.deviceUuid,
        videoId: req.body.videoId,
      },
    ]);
    res.send({ ok: true });
    return;
  }

  const existingDevice = getCachedDevice(req.body.deviceUuid);

  if (existingDevice) {
    const updatedData = cachedDevices.map((device: any) => {
      if (device.deviceUuid === req.body.deviceUuid) {
        return {
          ...device,
          videoId: req.body.videoId,
        };
      }
      return device;
    });
    cacheDevices(updatedData);
  } else {
    cacheDevices([
      ...cachedDevices,
      { deviceUuid: req.body.deviceUuid, videoId: req.body.videoId },
    ]);
  }

  res.send({ ok: true } as PostData);
};

const get = (req: NextApiRequest, res: NextApiResponse) => {
  if (getCachedDevices()) {
    const existingDevice = getCachedDevice(req.query.deviceUuid as string);

    if (existingDevice) {
      res.send({ data: existingDevice });
    } else {
      res.send({ data: null });
    }
  } else {
    res.send({ data: null });
  }
};
