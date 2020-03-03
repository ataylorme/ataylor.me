import React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import HeroImage from '../components/HeroImage'
import { rhythm, scale } from '../utils/typography'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const title = post.frontmatter.title !== null ? post.frontmatter.title : siteTitle
    const { previous, next } = this.props.pageContext
    const { heroImage } = this.props.data

    return (
      <React.Fragment>
        <HeroImage image={heroImage} title={title} />
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title={post.frontmatter.title} description={post.excerpt} />
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
              marginTop: rhythm(-1),
            }}
          >
            {post.frontmatter.date}
          </p>
          <MDXRenderer>{post.body}</MDXRenderer>
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Bio />

          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
              </Link>
              )}
            </li>
          </ul>
        </Layout>
      </React.Fragment>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!, $hero: String) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      body
    }
    heroImage: file(relativePath: { eq: $hero }) {
      childImageSharp {
        fluid(maxHeight: 350) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`
