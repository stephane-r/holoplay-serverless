import { geolocation, ipAddress } from "@vercel/edge";
import cors from "../../lib/cors";

export const config = {
  runtime: "edge",
};

export default async function handler(request: Request, response: Response) {
  // The geolocation helper pulls out the geoIP headers from the
  const geo = geolocation(request) || {};
  // The IP helper does the same function for the user's IP address
  const ip = ipAddress(request) || null;

  return cors(
    request,
    new Response(
      JSON.stringify({
        ...geo,
        ip,
      }),
      {
        headers: { "content-type": "application/json" },
      }
    )
  );
}
