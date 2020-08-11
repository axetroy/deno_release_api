// api/release.ts
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "https://deno.land/x/lambda/mod.ts";

interface GithubReleaseAsset {
  id: number;
  node_id: string;
  name: string;
  url: string;
  browser_download_url: string;
  download_count: number;
  created_at: string;
  updated_at: string;
}

interface GithubRelease {
  id: number;
  node_id: string;
  tag_name: string;
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  assets: GithubReleaseAsset[];
}

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const res = await fetch(
    "https://api.github.com/repos/denoland/deno/releases/latest"
  );

  const release = await res.json();

  return {
    statusCode: 200,
    body: release,
    headers: {
      "content-type": "application/json",
    },
  };
}
