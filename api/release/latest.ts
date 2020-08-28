// URL: /api/release/latest
import { ServerRequest } from "https://deno.land/std@0.66.0/http/server.ts";

import { getAllVersions } from "../../common.ts";

export default async function handler(req: ServerRequest) {
  const versions = await getAllVersions();

  await req.respond({
    status: 200,
    body: versions[versions.length - 1],
  });
}
