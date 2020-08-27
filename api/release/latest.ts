// URL: /api/release/latest
import { ServerRequest } from "https://deno.land/std@0.66.0/http/server.ts";

import { getAllVersions } from "../../common.ts";

export async function handler(req: ServerRequest) {
  const versions = await getAllVersions();

  const headers = new Headers();

  headers.append("content-type", "application/json");

  await req.respond({
    status: 200,
    body: versions[0],
    headers,
  });
}
