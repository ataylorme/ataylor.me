import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'

import { rhythm, scale } from '../utils/typography'

export default function Template({data}){
	const { markdownRemark: page } = data;
	const siteTitle = get(this.props, 'data.site.siteMetadata.title')
	return (
		<div>
        <Helmet title={`${page.frontmatter.title} | ${siteTitle}`} />
        <h1>{page.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
      </div>	
	)
}

export const pageQuery = graphql`
  query PagesByPath($path: String!) {
	
	site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
		html
		frontmatter {
		  title
		  path
		  slug
		  hero
		  hero_credit
		}
    }
  }
`