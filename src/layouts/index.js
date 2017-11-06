import React from 'react'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'
import Header from '../components/Header'
import AboutImage from '../components/AboutImage'

import { rhythm, scale } from '../utils/typography'
require('prismjs/themes/prism-solarizedlight.css')
require('../global.scss')

class Template extends React.Component {
  render() {
	const { location, children } = this.props
    let header, aboutImage, bodyClass

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    if (location.pathname === rootPath) {
      bodyClass = 'home'
	} else {
		bodyClass = 'page'
	}
	
	if( '/about' === location.pathname ){
		aboutImage = (<AboutImage/>)
	}

    return (
      <div id='main'>
		  <Header />
		  <Container
			style={{
			maxWidth: rhythm(24),
			padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
			}}
			className={bodyClass}
		>
			{aboutImage}
			{children()}
      	</Container>
	  </div>
    )
  }
}

export default Template