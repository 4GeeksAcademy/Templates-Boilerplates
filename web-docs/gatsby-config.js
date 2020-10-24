module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-dox',
      options: {
        basePath: '/',
        contentPath: 'docs'
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Montserrat`,
            variants: [`400`, `800`]
          },
        ],
      },
    }
  ]
}
