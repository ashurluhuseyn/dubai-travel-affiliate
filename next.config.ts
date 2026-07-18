import type { NextConfig } from "next";

function getSupabaseImageRemotePattern():
  | {
      protocol: "https";
      hostname: string;
      pathname: string;
    }
  | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    return null;
  }

  try {
    const hostname = new URL(supabaseUrl).hostname;
    return {
      protocol: "https",
      hostname,
      pathname: "/storage/v1/object/public/experience-media/**",
    };
  } catch {
    return null;
  }
}

const supabaseImagePattern = getSupabaseImageRemotePattern();

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      ...(supabaseImagePattern ? [supabaseImagePattern] : []),
    ],
  },
};

export default nextConfig;
