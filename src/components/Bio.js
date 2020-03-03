import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import { rhythm } from '../utils/typography'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div className="flex mb-20">
            <Image
              className="mr-4 mb-0 rounded-full"
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                minWidth: 50
              }}
            />
            <p>
              Written by <strong>{author}</strong>
              {` (`}
              <a href={`https://twitter.com/${social.twitter}`}>
                @ataylorme
              </a>
              {`)`}
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
