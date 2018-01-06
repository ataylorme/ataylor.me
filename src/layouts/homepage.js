import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'
import Header from '../components/Header'
import HeroImage from '../components/HeroImage'
import DateDisplay from '../components/DateDisplay'

import { rhythm, scale } from '../utils/typography'

require('../global.scss')

export default class HomePage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allMarkdownRemark.edges
    const { heroImage } = this.props.data

    return (
      <div id="main" className="home">
        <Header />
        <HeroImage image={heroImage} title={siteTitle} />
        <Container
          style={{
            maxWidth: rhythm(30),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <Helmet title={siteTitle} />
          <h1 style={{ fontWeight: 'normal' }}>Recent Posts</h1>
          <hr style={{ marginBottom: rhythm(1) }} />
          {posts.map(post => {
            const path = post.node.fields.slug
            const date = post.node.frontmatter.date
            const title = post.node.frontmatter.title

            if (path === '/404/' || date === null) {
              return null
            }

            return (
              <div key={path}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: 'none' }} to={path}>
                    {title}
                  </Link>
                </h3>
                <DateDisplay date={date} />
                <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
                <hr style={{ marginBottom: rhythm(1) }} />
              </div>
            )
          })}
        </Container>
      </div>
    )
  }
}

export const HomePageQuery = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/content/post/" } }
      limit: 10
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
    heroImage: file(
      relativePath: { eq: "images/heroes/salt-creek-falls.jpg" }
    ) {
      childImageSharp {
        sizes(maxHeight: 350) {
          ...GatsbyImageSharpSizes_withWebp_tracedSVG
        }
      }
    }
  }
`
