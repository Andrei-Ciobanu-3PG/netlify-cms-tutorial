const path = require("path");

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    const landingPagTemplate = path.resolve(`src/templates/landingPage.js`);

    return graphql(`
    {
        allLandingPagesJson {
            edges {
                node {
                    path
                }
            }
        }
    }
  `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors)
        }

        result.data.allLandingPagesJson.edges.forEach(({ node }) => {

            createPage({
                path: node.path,
                component: landingPagTemplate,
                context: {
                    filePath: node.path,
                },
            })
        })
    })
};
