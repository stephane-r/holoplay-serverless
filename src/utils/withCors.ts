import type { NextApiHandler } from "next";
import Cors from "cors";
import { runMiddleware } from "@/utils/runMiddleware";

export const withCors = (
  methods: string[],
  handler: NextApiHandler
): NextApiHandler => {
  const cors = Cors({ methods, origin: "*" });

  return async (req, res) => {
    await runMiddleware(req, res, cors);
    return handler(req, res);
  };
};
