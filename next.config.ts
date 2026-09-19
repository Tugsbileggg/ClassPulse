import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  poweredByHeader: false,
};

export default nextConfig;

// `next dev` үед D1 зэрэг Cloudflare binding-уудыг локал (Miniflare) хувилбараар холбоно.
initOpenNextCloudflareForDev();
