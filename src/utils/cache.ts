import { Redis } from "@upstash/redis";
import { Device } from "@/interfaces/Device";

const redis = Redis.fromEnv();

const SYNC_CODE_TTL_SECONDS = 60 * 15;
const DEVICE_TTL_SECONDS = 60 * 60;

const syncKey = (code: string) => `sync:${code}`;
const deviceKey = (deviceUuid: string) => `device:${deviceUuid}`;

export const createSyncCode = async (payload: unknown) => {
  let code: string;
  let isTaken: number;

  do {
    code = String(Math.floor(Math.random() * 1_000_000)).padStart(6, "0");
    isTaken = await redis.exists(syncKey(code));
  } while (isTaken);

  await redis.set(syncKey(code), payload, { ex: SYNC_CODE_TTL_SECONDS });

  return code;
};

export const getSyncPayload = (code: string) => redis.get(syncKey(code));

export const getDevice = (deviceUuid: string) =>
  redis.get<Device>(deviceKey(deviceUuid));

export const setDevice = (deviceUuid: string, videoId: string) =>
  redis.set<Device>(
    deviceKey(deviceUuid),
    { deviceUuid, videoId },
    { ex: DEVICE_TTL_SECONDS }
  );

export const deleteDevice = (deviceUuid: string) =>
  redis.del(deviceKey(deviceUuid));
