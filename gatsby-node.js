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
					let postPath = edge.node.frontmatter.path;
					let heroImage = ( ({}).hasOwnProperty.call(edge.node.frontmatter, 'hero') ) ? edge.node.frontmatter.hero : null;

					// Change template based on blog post or file
					if (edge.node.fileAbsolutePath.includes('src/content/pages')) {
						
					}

					// add blog to URI of blog posts
					if (edge.node.fileAbsolutePath.includes('src/content/posts')) {
						postPath = `/blog${edge.node.frontmatter.path}`;
						
					}


					if( heroImage !== null ){
						heroImage = `images/heroes/${heroImage}`;
					}

					createPage({
						path: postPath,
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