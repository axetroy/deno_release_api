// URL: /api/releases
import { ServerRequest } from "https://deno.land/std@0.66.0/http/server.ts";
import { getAllVersions } from "../common.ts";

export default async function handler(req: ServerRequest) {
  const headers = new Headers();

  headers.append("content-type", "application/json");

  await req.respond({
    status: 200,
    body: JSON.stringify(await getAllVersions()),
    headers,
  });
}
