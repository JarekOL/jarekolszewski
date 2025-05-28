/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://jarekolszewski.pl",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  trailingSlash: false,
  additionalPaths: async () => {
    const { getAllBlogPaths } = await import("./lib/getAllBlogPaths.js");
    return await getAllBlogPaths();
  },
};

export default config;
