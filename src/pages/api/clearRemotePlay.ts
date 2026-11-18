import type { NextApiRequest, NextApiResponse } from "next";
import { withCors } from "@/utils/withCors";
import { deleteDevice } from "@/utils/cache";

type Data = {
  ok: boolean;
};

export default withCors(["GET"], async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await deleteDevice(req.query.deviceUuid as string);

  res.send({ ok: true });
});
