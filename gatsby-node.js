const _ = require("lodash")
const Promise = require('bluebird')
const path = require('path')

  exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const pageTemplate = path.resolve("./src/templates/page.js")
  const postTemplate = path.resolve("./src/templates/blog-post.js")

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
		{
			allFile(filter: {
				internal: {mediaType: {eq: "text/markdown"}},
			  }) {
				edges {
				  node {
					sourceInstanceName
					childMarkdownRemark{
					  frontmatter {
						path
					  }
					}
				  }
				}
			  }
		  }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        _.each(result.data.allFile.edges, edge => {
			let currentTemplate = postTemplate;
			if( 'pages' === edge.node.sourceInstanceName ){
				currentTemplate = pageTemplate;
			}
          createPage({
            path: edge.node.childMarkdownRemark.frontmatter.path,
            component: currentTemplate,
            context: {
              path: edge.node.childMarkdownRemark.frontmatter.path,
            },
          })
        })
      })
    )
  })
}