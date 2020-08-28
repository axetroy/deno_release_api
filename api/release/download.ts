// URL: /api/release/download
import { ServerRequest } from "https://deno.land/std@0.66.0/http/server.ts";

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

  const response = await fetch(url);

  response.body?.getReader();

  if (response.body) {
    await req.respond({
      status: response.status,
      headers: response.headers,
    });

    const reader = response.body.getReader();

    const result = await reader.read();

    if (result.done) {
    } else {
      await req.w.write(result.value);
    }
  } else {
    await req.respond({
      status: response.status,
    });
  }
}
