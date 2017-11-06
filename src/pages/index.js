import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import { rhythm } from '../utils/typography'

/*
class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <Helmet title={siteTitle} />
        {posts.map(post => {
          if (post.node.frontmatter.path !== '/404/') {
            const title = get(post, 'node.frontmatter.title') || post.node.path
            return (
              <div key={post.node.frontmatter.path}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link
                    style={{ boxShadow: 'none' }}
                    to={post.node.frontmatter.path}
                  >
                    {title}
                  </Link>
                </h3>
                <small>{post.node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
              </div>
            )
          }
        })}
      </div>
    )
  }
}

export default BlogIndex
*/

export default ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  
  return (
      <div>
        <Helmet title={siteTitle} />
        {data.allFile.edges.map(post => {
          if (post.node.childMarkdownRemark.frontmatter.path !== '/404/') {
            const title = post.node.childMarkdownRemark.frontmatter.title
            return (
              <div key={post.node.childMarkdownRemark.frontmatter.path}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link
                    style={{ boxShadow: 'none' }}
                    to={post.node.childMarkdownRemark.frontmatter.path}
                  >
                    {title}
                  </Link>
                </h3>
                <small>{post.node.modifiedTime}</small>
                <p dangerouslySetInnerHTML={{ __html: post.node.childMarkdownRemark.excerpt }} />
              </div>
            )
          }
        })}
      </div>
    )
}

export const recentPostsQuery = graphql`
query recentPostsQuery {
	site {
		siteMetadata {
		  title
		}
	},
	allFile(
	  filter: {
		internal: {mediaType: {eq: "text/markdown"}},
		sourceInstanceName: {eq: "posts"},
	  },
	  sort: { fields: [modifiedTime], order: DESC}
	) {
		edges {
		  node {
			modifiedTime(formatString: "DD/MM/YYYY")
			childMarkdownRemark{
			  excerpt
			  frontmatter {
				title
				path
			  }
			}
		  }
		}
	  }
  }
`
