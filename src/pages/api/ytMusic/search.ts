import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { runMiddleware } from "@/utils/runMiddleware";
import { formateYtMusicToInvidious } from "@/utils/formateYtMusicToInvidious";
import { searchMusics, searchPlaylists } from "node-youtube-music";

const cors = Cors({
  methods: ["GET"],
  origin: "*",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await runMiddleware(req, res, cors);

  const search = (() => {
    switch (req.query.type) {
      case "video":
        return searchMusics;
      case "playlist":
        return searchPlaylists;
      default:
        return searchMusics;
    }
  })();

  const searchResult = await search(req.query.q as string);

  res.status(200).json(formateYtMusicToInvidious(searchResult));
}
