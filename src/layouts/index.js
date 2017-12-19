import React, {Component, PropTypes} from 'react'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'
import Header from '../components/Header'
import HeroImage from '../components/HeroImage'

import { rhythm, scale } from '../utils/typography'
require('prismjs/themes/prism-solarizedlight.css')
require('../global.scss')

export default class Template extends Component {
	render() {
		const { location, children, data } = this.props
		const siteTitle = data.site.siteMetadata.title
		const { heroImage } = data;
		let header, aboutImage, bodyClass
		
			let rootPath = `/`
			if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
			  rootPath = __PATH_PREFIX__ + `/`
			}
		
			if (location.pathname === rootPath) {
				return (
					<div id='main' className='home'>
						<Header />
						<HeroImage image={heroImage} title={siteTitle} />
						<Container
						  style={{
						  maxWidth: rhythm(30),
						  padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
						  }}
						  className="home"
					  >
						  {children()}
						</Container>
					</div>
				  )
			} else {
				return (
					<div>
						  {children()}
					</div>
				  )
			}
	}
}

export const HomePageQuery = graphql`
query HomePageQuery {
  site {
	siteMetadata {
	  title
	  author
	}
  }
  heroImage: file(relativePath: { eq: "images/heroes/salt-creek-falls.jpg" }) {
	  childImageSharp {
		sizes(maxHeight: 350) {
		  ...GatsbyImageSharpSizes_withWebp_tracedSVG
		}
	  }
  }
}
`