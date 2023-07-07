import { geolocation, ipAddress } from "@vercel/edge";
import Cors from "cors";
import { runMiddleware } from "@/utils/runMiddleware";

const cors = Cors({
  methods: ["GET"],
  origin: "*",
});

export const config = {
  runtime: "edge",
};

export default async function handler(request: Request, response: Response) {
  // @ts-ignore
  await runMiddleware(request, response, cors);
  // The geolocation helper pulls out the geoIP headers from the
  const geo = geolocation(request) || {};
  // The IP helper does the same function for the user's IP address
  const ip = ipAddress(request) || null;

  return new Response(
    JSON.stringify({
      ...geo,
      ip,
    }),
    {
      headers: { "content-type": "application/json" },
    }
  );
}
