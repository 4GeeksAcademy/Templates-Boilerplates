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
        configPath: `site/src/config`,
        docsPath: `site/src/docs`,
        githubUrl: `https://github.com/4GeeksAcademy/Templates-Boilerplates`,
        baseDir: `site`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Rocketseat Gatsby Themes`,
        short_name: `RS Gatsby Themes`,
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
        siteUrl: `https://rocketdocs.netlify.com`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify-cms`,
  ],
};
