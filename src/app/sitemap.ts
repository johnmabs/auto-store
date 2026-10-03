import type { MetadataRoute } from "next";

import { getSitemapVehicles } from "@/features/vehicles/vehicle.queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const vehicles = await getSitemapVehicles();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${siteUrl}/vehicles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const vehiclePages: MetadataRoute.Sitemap = vehicles.map((vehicle) => ({
    url: `${siteUrl}/vehicles/${vehicle.slug}`,
    lastModified: vehicle.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...vehiclePages];
}
