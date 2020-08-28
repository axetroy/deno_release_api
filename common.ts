import { Cache } from "./cache.ts";

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

interface DownloadInfo {
  darwin: string;
  linux: string;
  windows: string;
}

interface Release {
  version: string;
  downloadURL: DownloadInfo;
}

// Due to Github API limit, only 5000 requests per hour
// So on average, 5000/3600 = 1.388888889 requests can be sent per second
// To be conservative here, we cache the time in 5 seconds
const cache = Cache.create<Release[]>(1000 * 5);

export async function getAllVersions(): Promise<Release[]> {
  if (cache.get()) {
    return cache.get() as Release[];
  }

  const res = await fetch(
    "https://api.github.com/repos/denoland/deno/git/refs/tags",
  );

  const tags: Tag[] = await res.json();

  const releases = tags
    .filter((v) => /^refs\/tags\/v?\d+\.\d+\.\d+/.test(v.ref))
    .map((v) => {
      const version = v.ref.replace(/^refs\/tags\//, "");

      return {
        version,
        downloadURL: {
          windows: getDownloadUrl(version, "windows", "x86_64"),
          linux: getDownloadUrl(version, "linux", "x86_64"),
          darwin: getDownloadUrl(version, "darwin", "x86_64"),
        },
      };
    });

  cache.set(releases);

  return releases;
}

function getArch(version: string, arch: typeof Deno.build.arch): string {
  switch (arch) {
    case "x86_64":
      return arch;
    default:
      return arch;
  }
}

function getOs(version: string, os: typeof Deno.build.os): string {
  switch (os) {
    case "darwin":
      return "apple-darwin";
    case "windows":
      return "windows";
    default:
      return "unknown-linux-gnu";
  }
}

export function getDownloadUrl(
  version: string,
  os: typeof Deno.build.os,
  arch: typeof Deno.build.arch,
): string {
  const domain = `https://github.com`;

  const fileName = `deno-${getArch(version, arch)}-${getOs(version, os)}.zip`;

  return `${domain}/denoland/deno/releases/download/${version}/${fileName}`;
}
