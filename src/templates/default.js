import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'
import Header from '../components/Header'
import Img from "gatsby-image"
import AboutImage from '../components/AboutImage'
import HeroImage from '../components/HeroImage'
import ContactForm from '../components/ContactForm'

import { rhythm, scale } from '../utils/typography'
require('prismjs/themes/prism-solarizedlight.css')
require('../global.scss')

export default ({ data }) => {
	const { markdownRemark: page, heroImage } = data;
	const siteTitle = data.site.siteMetadata.title;
	const path = page.frontmatter.path;
	const title = page.frontmatter.title;
	const date = page.frontmatter.date;
	let header, bodyClass;
	let pageTitle = null;
	
	let rootPath = `/`
	if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
		rootPath = __PATH_PREFIX__ + `/`
	}

	if (path === rootPath) {
		bodyClass = 'home'
	} else {
		bodyClass = 'page'
	}

	if( heroImage === null ){
		let pageTitle = (<h1>{page.frontmatter.title}</h1>)
	}

	let dateDiv = ( date === null ) ? null : (<div className="date">{date}</div>);
	console.log(dateDiv);
	
	return (
		<div id='main'>
			<Header />
			<HeroImage image={heroImage} title={title} />
			<Container
			style={{
			maxWidth: rhythm(24),
			padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
			}}
			className={bodyClass}
		>
				<AboutImage path={path}  />
				<div>
					<Helmet title={`${page.frontmatter.title} | ${siteTitle}`} />
					{pageTitle}
					{dateDiv}
					<div dangerouslySetInnerHTML={{ __html: page.html }} />
					<hr
					style={{
						marginBottom: rhythm(1),
					}}
					/>
				</div>	
				<ContactForm path={path} />
			</Container>
		</div>
	)
}

export const pageQuery = graphql`
  query PagesByPath($path: String!, $hero: String) {
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
		  date(formatString: "MM/DD/YYYY")
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