// api/release.ts
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "https://deno.land/x/lambda@1.2.2/mod.ts";

import { Version } from "../common.ts";

interface GithubReleaseAsset {
  id: number;
  node_id: string;
  name: string;
  url: string;
  browser_download_url: string;
  download_count: number;
  size: number;
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
  published_at: string;
  created_at: string;
}

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const res = await fetch(
    "https://api.github.com/repos/denoland/deno/releases/latest"
  );

  const release: GithubRelease = await res.json();

  const version: Version = {
    version: release.tag_name,
    published_at: release.published_at,
    assets: release.assets.map((v) => {
      const matcher = /^deno-([^-]+)-(.+)\.\w+$/.exec(v.name) || [];

      const [_, arch, platform] = matcher;

      return {
        filename: v.name,
        platform: platform,
        arch: arch,
        download_url: v.browser_download_url,
        size: v.size,
      };
    }),
  };

  return {
    statusCode: 200,
    body: JSON.stringify(version),
    headers: {
      "content-type": "application/json",
    },
  };
}
