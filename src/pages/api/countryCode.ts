import type { NextApiRequest, NextApiResponse } from "next";
import { withCors } from "@/utils/withCors";

const FLAG_UNICODE_OFFSET = 127397;

const countryFlag = (countryCode?: string) => {
  if (!countryCode || !/^[A-Z]{2}$/.test(countryCode)) return undefined;
  return String.fromCodePoint(
    ...countryCode
      .split("")
      .map((char) => FLAG_UNICODE_OFFSET + char.charCodeAt(0))
  );
};

const header = (req: NextApiRequest, name: string) => {
  const value = req.headers[name];
  return Array.isArray(value) ? value[0] : value;
};

export default withCors(["GET"], async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const country = header(req, "x-vercel-ip-country");

  res.status(200).json({
    city: header(req, "x-vercel-ip-city"),
    country,
    flag: countryFlag(country),
    countryRegion: header(req, "x-vercel-ip-country-region"),
    latitude: header(req, "x-vercel-ip-latitude"),
    longitude: header(req, "x-vercel-ip-longitude"),
    postalCode: header(req, "x-vercel-ip-postal-code"),
    ip: header(req, "x-real-ip") ?? req.socket.remoteAddress ?? null,
  });
});
