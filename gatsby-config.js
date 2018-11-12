module.exports = {
    plugins: [
        'gatsby-plugin-netlify-cms',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/landing_pages`,
                name: 'json-pages',
            },
        },
        'gatsby-transformer-json',
        `gatsby-plugin-remove-trailing-slashes`
    ],
};
