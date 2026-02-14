import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/create", "/v/"],
        disallow: [
          "/dashboard",
          "/preview/",
          "/create/*/",
          "/api/",
          "/login",
          "/signup",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
