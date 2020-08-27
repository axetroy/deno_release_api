import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "https://deno.land/x/lambda@1.3.1/mod.ts";

import { getAllVersions } from "../../common.ts";

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const res = await fetch(
    "https://api.github.com/repos/denoland/deno/git/refs/tags"
  );

  const versions = await getAllVersions();

  return {
    statusCode: 200,
    body: versions[0],
    headers: {
      "content-type": "application/json",
    },
  };
}
