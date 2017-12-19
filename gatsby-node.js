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
	const defaultTemplate = path.resolve("./src/templates/default.js")

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
								hero
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
					let currentTemplate = defaultTemplate;
					let heroImage = ( ({}).hasOwnProperty.call(edge.node.frontmatter, 'hero') ) ? edge.node.frontmatter.hero : null;

					// Change template based on page or blog post
					if (edge.node.fileAbsolutePath.includes('src/content/pages')) {
						
					}

					if (edge.node.fileAbsolutePath.includes('src/content/posts')) {
						
						
					}

					// Append file path to hero image if there is one
					if( heroImage !== null ){
						heroImage = `images/heroes/${heroImage}`;
					}

					createPage({
						path: edge.node.frontmatter.path,
						component: currentTemplate,
						context: {
							path: edge.node.frontmatter.path,
							hero: heroImage,
						},
					})

				})
			})
		)
	})
}