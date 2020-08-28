// URL: /api/release/download
import { ServerRequest } from "https://deno.land/std@0.66.0/http/server.ts";
import { fromStreamReader } from "https://deno.land/std@v0.66.0/io/streams.ts";

type Platform = "darwin" | "linux" | "windows";

export default async function handler(req: ServerRequest) {
  const u = new URL(req.url);
  const version = u.searchParams.get("version");
  const platform = u.searchParams.get("platform") as Platform;

  if (!version || !platform) {
    await req.respond({
      status: 400,
      body: "query params required!",
    });
    return;
  }

  const os = platform === "windows"
    ? "pc-windows-msvc"
    : platform === "darwin"
    ? "apple-darwin"
    : "unknown-linux-gnu";

  const url =
    `https://github.com/denoland/deno/releases/download/${version}/deno-x86_64-${os}.zip`;

  const res = await fetch(url);

  if (res.body) {
    await req.respond({
      status: res.status,
      headers: res.headers,
    });

    const reader = fromStreamReader(res.body.getReader());

    await Deno.copy(reader, req.w);
  } else {
    await req.respond({
      status: res.status,
      headers: res.headers,
    });
  }
}
