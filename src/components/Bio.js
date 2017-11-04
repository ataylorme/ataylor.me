import React from 'react'
import Link from 'gatsby-link'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.png'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
		  alignItems: 'center',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Andrew Taylor`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p style={{marginBottom: 0}}>
          Hi, I'm <strong>Andrew Taylor</strong>. A web enthusiast living in the Pacific Northwest.{' '}
          Read more <Link to="/about/">about me</Link>, find me on{' '}
		  <a href="https://twitter.com/ataylorme">Twitter</a>{' '}
		  and <a href="https://github.com/ataylorme">GitHub</a>{' '}
		  or <Link to="/contact/">contact me</Link>.
        </p>
      </div>
    )
  }
}

export default Bio
