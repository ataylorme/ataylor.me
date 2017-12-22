const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// Dynamically create pages
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
	
	// Stash all of our templates
	const templates = {
		default: path.resolve('./src/templates/default.js'),
	}

	// Query the items in "content"
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(limit: 10000) {
              edges {
                node {
                  fields {
                    slug
				  }
				  frontmatter {
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

        // Loop through the resulting items
        _.each(result.data.allMarkdownRemark.edges, edge => {
			let heroImage = (({}).hasOwnProperty.call(edge.node.frontmatter, 'hero')) ? edge.node.frontmatter.hero : null
			const path = edge.node.fields.slug
			let template = templates.default

			// Append file path to hero image if there is one
			if (heroImage !== null) {
				heroImage = `images/heroes/${heroImage}`;
			}

			// Do something to blog posts (but not the blog archive)
			if( path.includes('/blog/') && path !== '/blog/' ){
				// template = templates.post
			}

			// Change the layout for the blog archive page
			if( path === '/blog/' ) {
				createPage({
					path: edge.node.fields.slug,
					component: template,
					layout: 'blog-feed',
					context: {
						slug: edge.node.fields.slug,
						hero: heroImage,
					},
				  })
			} else {
				 // Create the post/page
				 createPage({
					path: edge.node.fields.slug,
					component: template,
					context: {
						slug: edge.node.fields.slug,
						hero: heroImage,
					},
				  })
			}

        })
      })
    )
  })
}

// Implement the Gatsby API "onCreatePage". This is called after every page is created.
exports.onCreatePage = ({ page, boundActionCreators }) => {
	const { createPage, deletePage } = boundActionCreators;
  
	return new Promise((resolve, reject) => {
		// Clone the existing page into oldPage
		const oldPage = Object.assign({}, page);
		
		// On the homepage
		if (page.path === "/" ) {
			// Change the context so we have a hero image
			page.context = {
				path: "/",
				hero: "images/heroes/salt-creek-falls.jpg"
			}

			// page.component = path.resolve("./src/templates/homePage.js");
			
			// Change the layout to homepage
			page.layout = 'homepage'

			// Update the page by deleting the old page and re-creating the page.
			deletePage(oldPage);
			createPage(page);
	  }
  
	  resolve();
	});
  }

// Implement the Gatsby API "onCreateNode". This is called after every node is created.
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField, createPage } = boundActionCreators

  // Add "slug" to markdown files based on their relative file path
  if (node.internal.type === `MarkdownRemark`) {
	let value = createFilePath({ node, getNode })

	// Slug is used for the web path, which should be /blog not /posts
	if( value.startsWith('/posts/') ){
		value = `/blog${value.slice(6)}`
	// Strip pages/ from the web path of static pages
	} else if( value.startsWith('/pages/') ){
		value = value.slice(6)
	}

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}