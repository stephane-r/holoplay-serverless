import { MusicVideo } from "node-youtube-music";
import { InvidiousVideo } from "@/interfaces/Invidious";

export const formateYtMusicToInvidious = (
  data: MusicVideo[]
): InvidiousVideo[] => {
  return data.map((item) => ({
    videoId: item.youtubeId as string,
    title: item.title as string,
    type: "video",
    // Default format needed on client
    videoThumbnails: [
      {
        width: 120,
        height: 120,
        quality: "maxresdefault",
        url: item.thumbnailUrl as string,
      },
      {
        width: 120,
        height: 120,
        quality: "default",
        url: item.thumbnailUrl as string,
      },
    ],
    lengthSeconds: item.duration?.totalSeconds as number,
  }));
};
