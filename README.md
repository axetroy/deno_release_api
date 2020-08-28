### API service for getting Deno versions

#### [GET] /api/releases

get all versions for Deno

```bash
$ curl https://deno-release.now.sh/api/releases
```

#### [GET] /api/release/latest

get latest version for Deno

```bash
$ curl https://deno-release.now.sh/api/release/latest
```

#### [GET] /api/release/download?version=v1.3.0&platform=Linux

download deno

platform: `'linux'` | `'darwin'` | `'windows'`

```bash
$ curl https://deno-release.now.sh/api/release/download?version=v1.3.0&platform=darwin
```
