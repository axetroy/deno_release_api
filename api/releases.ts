// api/release.ts
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "https://deno.land/x/lambda@1.2.2/mod.ts";

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  return {
    statusCode: 200,
    body: `Welcome to deno release ${Deno.version.deno} 🦕`,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  };
}
