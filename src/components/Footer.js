import React from 'react'
import Link from 'gatsby-link'
import Icons from './Icons'

const year = new Date().getFullYear()

const gatsbyLink = (<Link className="text-white hover:no-underline" to="https://www.gatsbyjs.org/">Gatsby JS</Link>)

const privacyLink = (<Link className="text-white hover:no-underline" to="/privacy-policy">Privacy Policy</Link>)

const Footer = () => (
  <footer id="footer" className="bg-blue-700 text-white">
    <div className="max-w-screen-lg flex justify-between content-center items-center text-center mx-auto">
      <div className="p-1">
        Powered by {gatsbyLink} | {privacyLink} | &copy; {year} Andrew Taylor 
      </div>
      <div className="p-1">
        <Icons icon="twitter" link={true} />
      </div>
      <div className="p-1">
        <Icons icon="github" link={true} />
      </div>
    </div>
  </footer>
)

export default Footer