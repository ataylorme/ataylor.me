import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const pages = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <Helmet title={siteTitle} />
        {pages.map(page => {
          if (page.node.frontmatter.path !== '/404/') {
            const title = get(page, 'node.frontmatter.title') || page.node.path
            return (
              <div key={page.node.frontmatter.path}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link
                    style={{ boxShadow: 'none' }}
                    to={page.node.frontmatter.path}
                  >
                    {title}
                  </Link>
                </h3>
                <small>{page.node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: page.node.excerpt }} />
              </div>
            )
          }
        })}
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query PageIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      edges {
        node {
          excerpt
          frontmatter {
            path
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
