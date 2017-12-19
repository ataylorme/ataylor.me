import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import { rhythm } from '../utils/typography'

export default ({ data }) => {
  if( data === undefined ){
	  return null;
  }
  const siteTitle = data.site.siteMetadata.title
  
  return (
      <div>
        <Helmet title={siteTitle} />
        {data.allMarkdownRemark.edges.map(post => {
          if (post.node.frontmatter.path !== '/404/' && post.node.frontmatter.date !== null) {
            const title = post.node.frontmatter.title
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

export const recentPostsQuery = graphql`
query recentPostsQuery {
	site {
	  siteMetadata {
		title
	  }
	}
	allMarkdownRemark(
		filter: {
			fileAbsolutePath: {regex: "/src/content/post/"}
		},
		limit: 10,
		 sort: {
			 fields: [frontmatter___date], order: DESC}
	) {
	  edges {
		node {
		  excerpt
		  frontmatter {
			title
			path
			date(formatString: "MM/DD/YYYY")
		  }
		}
	  }
	}
  }
`
