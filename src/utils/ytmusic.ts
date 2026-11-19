import YTMusic from "ytmusic-api";

let client: Promise<YTMusic> | null = null;

export const getYtMusicClient = () => {
  if (!client) {
    client = new YTMusic().initialize().catch((error) => {
      client = null;
      throw error;
    });
  }
  return client;
};
