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
