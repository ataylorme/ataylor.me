import React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import HeroImage from '../components/HeroImage'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const title = post.frontmatter.title !== null ? post.frontmatter.title : siteTitle
    const { previous, next } = this.props.pageContext
    const heroImage = post.frontmatter.hero

    return (
      <React.Fragment>
        <HeroImage image={heroImage} title={title} />
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title={post.frontmatter.title} description={post.excerpt} />
          {
            !heroImage && (
              <h1 className="text-5xl font-black mt-8 mb-0">
                {title}
              </h1>
            )
          }
          <p className="text-sm leading-loose mb-8">
            {post.frontmatter.date}
          </p>
          <MDXRenderer>{post.body}</MDXRenderer>
          <section
            className="markdown"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <hr className="h-px mb-8" />
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
  query($slug: String!) {
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
        hero {
          childImageSharp {
            fluid(maxHeight: 350) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
      body
    }
  }
`
