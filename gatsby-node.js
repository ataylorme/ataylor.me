const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // Stash all of our templates
  const templatePath = './src/templates'
  const templates = {
    default: path.resolve(`${templatePath}/default.js`),
    // blogPost: path.resolve(`${templatePath}/blog-post.js`),
  }
  return graphql(
    `
    {
      allMdx(sort: {fields: [frontmatter___date], order: DESC}, limit: 1000) {
        edges {
          node {
            fields {
              slug
              collection
            }
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMdx.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      const path = post.node.fields.slug
      const postType = post.node.fields.collection
      let template = templates.default

      const context = {
        slug: path,
        postType: postType
      }

      // Do something to blog posts (but not the blog archive)
      if (path.includes('/blog/') && path !== '/blog/') {
        // Add previous/next to context
        context.previous = previous
        context.next = next
      }

      // Change the layout for the blog archive page
      if (path === '/blog/') {
        createPage({
          path: path,
          component: template,
          layout: 'blog-feed',
          context: context,
        })
      } else {
        // Create the post/page
        createPage({
          path: path,
          component: template,
          context: context,
        })
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    // Get the parent node
    const parentNode = getNode(node.parent)
    const postType = parentNode.sourceInstanceName
    const value = createFilePath({ node, getNode })
    // Slug is used for the web path, which should be /blog not /posts
    if (value.startsWith('/posts/')) {
      value = `/blog/${value.slice(7)}`
      // Strip pages/ from the web path of static pages
    } else if (value.startsWith('/pages/')) {
      value = value.slice(6)
    }

    createNodeField({
      name: `slug`,
      node,
      value,
    })

    // Create a field on this node for the "collection" of the parent
    // NOTE: This is necessary so we can filter `allMarkdownRemark` by
    // `collection` otherwise there is no way to filter for only markdown
    // documents of type `post`.
    createNodeField({
      name: 'collection',
      node,
      value: parentNode.sourceInstanceName,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter!
    }
    type MdxFrontmatter {
      hero: File @fileByRelativePath
    }
  `)
}