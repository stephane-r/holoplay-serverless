import { Device } from "@/interfaces/Device";
import NodeCache from "node-cache";

export enum CacheKeys {
  devices = "devices",
}

export const cache = new NodeCache({
  checkperiod: 600, // in seconds
});

export const getCachedDevices = () => {
  const cachedDevices = cache.get(CacheKeys.devices) as string | undefined;

  if (cachedDevices) {
    return JSON.parse(cachedDevices) as Device[];
  }

  return null;
};

export const getCachedDevice = (deviceUuid: string) => {
  const cachedDevices = getCachedDevices();
  if (!cachedDevices) return null;
  return cachedDevices.find(
    (device: any) => device.deviceUuid === deviceUuid
  ) as Device;
};

export const cacheDevices = (devices: Device[]) => {
  cache.set(CacheKeys.devices, JSON.stringify(devices));
};
