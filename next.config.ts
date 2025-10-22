import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    KOREAN_DICT_API_KEY: process.env.KOREAN_DICT_API_KEY,
  },
};

export default nextConfig;
