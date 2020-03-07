import React from 'react'
import { Link, graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/seo'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges
    let imageLeft = false

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`Andrew Taylor`]}
        />
        <h2 className="text-center">Latest Posts</h2>
        <div>
          {posts.map(({ node }) => {
            imageLeft = !imageLeft
            const { slug } = node.fields
            const { hero, date } = node.frontmatter
            const title = node.frontmatter.title || slug
            let heroCard = null
            // Full width card if no hero image
            let textCard = (
              <div className="px-3 py-2">
                <h3 className="m-0 mt-1">
                  <Link
                    className="text-blue-600 shadow-none"
                    to={slug}
                  >
                    {title}
                  </Link>
                </h3>
                <div className="py-1 font-semibold">
                  <small>{date}</small>
                </div>
                <p
                  className="text-gray-700 text-base"
                  dangerouslySetInnerHTML={{ __html: node.excerpt }}
                />
              </div>
            )
            // Hero image on left, text on right if there is a hero image
            if (null !== hero) {
              textCard = (
                <div className="w-full md:w-1/2">
                  {textCard}
                </div>
              )
              heroCard = (
                  <div className="w-full md:w-1/2">
                    <Image
                      className="w-full"
                      fluid={hero.childImageSharp.fluid}
                      style={{
                        minWidth: 250
                      }}
                    />
                  </div>
              )
            }
            const card = (imageLeft) ? (<React.Fragment>{heroCard}{textCard}</React.Fragment>) : (<React.Fragment>{textCard}{heroCard}</React.Fragment>)
            return (
              <div class="flex flex-wrap my-4 rounded overflow-hidden shadow-md" ke={slug}>
                {card}
              </div>
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            hero {
              childImageSharp {
                fluid(maxWidth: 550) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
