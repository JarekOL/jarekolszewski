/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: "https://jarekolszewski.pl",
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: "daily",
    priority: 0.7,
    trailingSlash: false,
    additionalPaths: async () => {
    const { getAllBlogPaths, getAllPageSlugs } = await import("./lib/getAllPaths.js");

    const blogPaths = await getAllBlogPaths();
    const pagePaths = await getAllPageSlugs();

    return [...blogPaths, ...pagePaths];
  },
};

export default config;
