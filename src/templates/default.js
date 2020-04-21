import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import HeroImage from '../components/HeroImage'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import ImageGrid from '../components/ImageGrid'
import Card from '../components/Card'

const components = {}

const DefaultTemplate = ({ data, pageContext, location }) => {
  const allComponents = useMemo(() => {
    const GalleryComponent = ({ id, type, ...props }) => {
      if( ! Object.prototype.hasOwnProperty.call(data.mdx.frontmatter, 'galleries') ) {
        return null
      }
      const galleries = data.mdx.frontmatter.galleries
      /**
       * Create a new galleries sorted object using the IDs for
       * keys and set the values to an array of image objects
       */
      const galleriesSorted = galleries.reduce(
        (acc, gallery) => {
          acc[gallery.id] = gallery.images
          return acc
        },
        {}
      )
      const galleryImages = galleriesSorted[id]
      return (type === "grid") ? <ImageGrid images={galleryImages} {...props} /> : <Gallery images={galleryImages} {...props} />
    }
    const CardComponent = ({ id, type, ...props }) => {
      if( ! Object.prototype.hasOwnProperty.call(data.mdx.frontmatter, 'cards') ) {
        return null
      }
      const cards = data.mdx.frontmatter.cards
      /**
       * Create a new cards sorted object using the IDs for
       * keys and set the values to an array of image objects
       */
      const cardsSorted = cards.reduce(
        (acc, card) => {
          acc[card.id] = card.image
          return acc
        },
        {}
      )
      const cardImage = cardsSorted[id]
      return <Card image={cardImage} {...props} />
    }
    return {
      ...components,
      Gallery: GalleryComponent,
      Card: CardComponent,
    }
  }, [data])
  const post = data.mdx
  const { previous, next } = pageContext
  const heroImage = post.frontmatter.hero
  const siteTitle = data.site.siteMetadata.title
  const title = post.frontmatter.title !== null ? post.frontmatter.title : siteTitle
  return (
    <React.Fragment>
      <Navigation />
      <HeroImage image={heroImage} title={title} />
      <Layout location={location} title={title}>
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
        <article className="post">
          <MDXProvider components={allComponents}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </article>
        <section
          className="markdown"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr className="h-px mb-8" />

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
      <Footer />
    </React.Fragment>
  )
}

export default DefaultTemplate


export const singleContentQuery = graphql`
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
            fluid(maxHeight: 256) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        galleries {
          id
          images {
            title
            src {
              full: childImageSharp {
                fluid(
                  maxWidth: 1200
                  maxHeight: 1200
                  srcSetBreakpoints: [576, 768, 992, 1200]
                ) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
        cards {
          id
          image{
            childImageSharp {
              fluid(
                maxWidth: 1200
                maxHeight: 1200
                srcSetBreakpoints: [576, 768, 992, 1200]
              ) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
      body
    }
  }
`
