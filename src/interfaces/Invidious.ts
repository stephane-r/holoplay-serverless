type QualityTypes =
  | "maxres"
  | "maxresdefault"
  | "sddefault"
  | "high"
  | "medium"
  | "default"
  | "start"
  | "middle"
  | "end";

type VideoTypes = "video" | "playlist" | "channel";

export interface VideoThumbnail {
  width: number;
  height: number;
  quality: QualityTypes;
  url: string;
}

export interface InvidiousVideo {
  videoId: string;
  title: string;
  type: VideoTypes;
  videoThumbnails: VideoThumbnail[];
  lengthSeconds: number;
}
