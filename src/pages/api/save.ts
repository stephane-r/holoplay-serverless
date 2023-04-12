import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { runMiddleware } from "@/utils/runMiddleware";
import { cache } from "@/utils/cache";

const cors = Cors({
  methods: ["POST"],
  origin: "*",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

type Data = {
  code: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);

  const code = Math.floor(Math.random() * 900000);
  cache.set(code, JSON.stringify(req.body));

  res.status(200).json({ code });
}
