import type { PlaylistDetailed, SongDetailed, VideoDetailed } from "ytmusic-api";
import { InvidiousVideo } from "@/interfaces/Invidious";

type YtMusicResult = SongDetailed | VideoDetailed | PlaylistDetailed;

export const formateYtMusicToInvidious = (
  data: YtMusicResult[]
): InvidiousVideo[] => {
  return data.map((item) => {
    const thumbnailUrl = item.thumbnails.at(-1)?.url as string;

    return {
      videoId: "videoId" in item ? item.videoId : item.playlistId,
      title: item.name,
      type: "video",
      // Default format needed on client
      videoThumbnails: [
        {
          width: 120,
          height: 120,
          quality: "maxresdefault",
          url: thumbnailUrl,
        },
        {
          width: 120,
          height: 120,
          quality: "default",
          url: thumbnailUrl,
        },
      ],
      lengthSeconds: "duration" in item ? (item.duration ?? 0) : 0,
    };
  });
};
