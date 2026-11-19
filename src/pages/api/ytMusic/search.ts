import type { NextApiRequest, NextApiResponse } from "next";
import { withCors } from "@/utils/withCors";
import { formateYtMusicToInvidious } from "@/utils/formateYtMusicToInvidious";
import { getYtMusicClient } from "@/utils/ytmusic";

export default withCors(["GET"], async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const ytmusic = await getYtMusicClient();
  const query = req.query.q as string;

  const searchResult =
    req.query.type === "playlist"
      ? await ytmusic.searchPlaylists(query)
      : await ytmusic.searchSongs(query);

  res.status(200).json(formateYtMusicToInvidious(searchResult));
});
