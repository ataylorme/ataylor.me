const _ = require("lodash")
const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({
	graphql,
	boundActionCreators
}) => {
	const {
		createPage
	} = boundActionCreators;
	const pageTemplate = path.resolve("./src/templates/page.js")
	const postTemplate = path.resolve("./src/templates/blog-post.js")

	return new Promise((resolve, reject) => {
		resolve(
			graphql(
				`
		{
			allMarkdownRemark {
				edges {
					node {
						fileAbsolutePath
						frontmatter {
						  path
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

				// Create blog posts and pages.
				_.each(result.data.allMarkdownRemark.edges, edge => {
					let currentTemplate = postTemplate;
					let postPath = edge.node.frontmatter.path;

					// Change template based on blog post or file
					if (edge.node.fileAbsolutePath.includes('src/content/pages')) {
						currentTemplate = pageTemplate;
					}

					// add blog to URI of blog posts
					if (edge.node.fileAbsolutePath.includes('src/content/posts')) {
						postPath = `/blog${edge.node.frontmatter.path}`;
					}

					createPage({
						path: postPath,
						component: currentTemplate,
						context: {
							path: edge.node.frontmatter.path,
						},
					})

				})
			})
		)
	})
}