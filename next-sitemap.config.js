/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://jarekolszewski.pl",
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: "daily",
    priority: 0.7,
    trailingSlash: false,
    additionalPaths: async () => {
        return [{ loc: "/sesja-slubna-w-gorach" }];
    },
};
