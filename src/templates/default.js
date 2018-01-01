import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Container } from 'react-responsive-grid'
import Header from '../components/Header'
import HeroImage from '../components/HeroImage'
import AboutImage from '../components/AboutImage'
import ContactForm from '../components/ContactForm'
import DateDisplay from '../components/DateDisplay'
import PageTitle from '../components/PageTitle'

import { rhythm, scale } from '../utils/typography'

export default class DefaultTemplate extends React.Component {
  render() {
    const { markdownRemark: post, heroImage } = this.props.data
    const siteTitle = this.props.data.site.siteMetadata.title
    const title =
	  post.frontmatter.title !== null ? post.frontmatter.title : siteTitle
    const path = post.fields.slug
    const date = post.frontmatter.date

    return (
      <div id="main">
        <Header />
        <HeroImage image={heroImage} title={title} />
        <Container
          style={{
            maxWidth: rhythm(30),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <AboutImage path={path} />
          <Helmet title={title} />
          <PageTitle title={title} hero={heroImage} />
          <DateDisplay date={date} />
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <ContactForm path={path} />
        </Container>
      </div>
    )
  }
}

export const DefaultItemsBySlug = graphql`
  query DefaultItemsBySlug($hero: String!, $slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero
      }
    }
    heroImage: file(relativePath: { eq: $hero }) {
      childImageSharp {
        sizes(maxHeight: 350) {
          ...GatsbyImageSharpSizes_withWebp_tracedSVG
        }
      }
    }
  }
`
