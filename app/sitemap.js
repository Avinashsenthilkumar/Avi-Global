import { siteConfig } from "@/lib/config";
import { projects } from "@/lib/projects";

export default function sitemap() {
  const staticRoutes = ["", "/about", "/projects", "/services", "/process", "/contact"].map(
    (route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
    })
  );

  const projectRoutes = projects.map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
