// api/release.ts
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "https://deno.land/x/lambda@1.3.1/mod.ts";
import { getAllVersions } from "../common.ts";

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: JSON.stringify(await getAllVersions()),
    headers: {
      "content-type": "application/json",
    },
  };
}
