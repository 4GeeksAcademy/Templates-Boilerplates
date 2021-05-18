module.exports = {
  siteMetadata: {
    siteTitle: `4Geeks Coding Boilerplates for Junior Developers`,
    defaultTitle: `4Geeks Coding Boilerplates for Junior Developers`,
    siteTitleShort: `4Geeks Coding Boilerplates`,
    siteDescription: `Stat a project in minutes, not setup and low learning curve`,
    siteUrl: `https://start.4geeksacademy.com`,
    siteAuthor: `@4geeksacademy`,
    siteImage: `/banner.png`,
    siteLanguage: `en`,
    themeColor: `#8257E6`,
    basePath: `/`,
  },
  plugins: [
    {
      resolve: `@rocketseat/gatsby-theme-docs`,
      options: {
        configPath: `src/config`,
        docsPath: `src/docs`,
        githubUrl: `https://github.com/4GeeksAcademy/Templates-Boilerplates`,
        baseDir: `site`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `4Geeks Academy Starters`,
        short_name: `4G Academy Starter`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // trackingId: ``,
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://start.4geeksacademy.com`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify-cms`,
  ],
};
