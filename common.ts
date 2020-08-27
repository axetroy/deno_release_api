export interface Version {
  version: string;
  published_at: string;
  assets: Asset[];
}

export interface Asset {
  platform: string;
  arch: string;
  filename: string;
  download_url: string;
  size: number;
}

interface Object {
  sha: string;
  type: string;
  url: string;
}

interface Tag {
  ref: string;
  node_id: string;
  url: string;
  object: Object;
}

export async function getAllVersions(): Promise<string[]> {
  const res = await fetch(
    "https://api.github.com/repos/denoland/deno/git/refs/tags",
  );

  const tags: Tag[] = await res.json();

  return tags
    .filter((v) => /^refs\/tags\/v?\d+\.\d+\.\d+/.test(v.ref))
    .map((v) => v.ref.replace(/^refs\/tags\//, ""));
}
