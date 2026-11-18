import type { NextApiRequest, NextApiResponse } from "next";
import { withCors } from "@/utils/withCors";
import { formateYtMusicToInvidious } from "@/utils/formateYtMusicToInvidious";
import { searchMusics, searchPlaylists } from "node-youtube-music";

export default withCors(["GET"], async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const search = req.query.type === "playlist" ? searchPlaylists : searchMusics;

  const searchResult = await search(req.query.q as string);

  res.status(200).json(formateYtMusicToInvidious(searchResult));
});
