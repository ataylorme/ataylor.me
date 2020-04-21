import React from 'react'
import Link from 'gatsby-link'
import Icons from '../Icons'

const Navigation = () => (
  <nav id="nav" className="bg-blue-700">
    <div className="max-w-screen-lg flex justify-between content-center items-center text-center mx-auto">
      <div className="p-1">
        <Link className="block text-white no-underline hover:underline opacity-75 hover:opacity-100 transition-opacity duration-300" to="/">
          Home
      </Link>
      </div>
      <div className="p-1">
        <Link className="block text-white no-underline hover:underline opacity-75 hover:opacity-100 transition-opacity duration-300" to="/about/">
          About
      </Link>
      </div>
      {/*
      <div className="p-1">
        <Link className="block text-white no-underline hover:underline opacity-75 hover:opacity-100 transition-opacity duration-300" to="/blog/">
          Blog
      </Link>
      </div>
      */}
      <div className="p-1">
        <Link className="block text-white no-underline hover:underline opacity-75 hover:opacity-100 transition-opacity duration-300" to="/contact/">
          Contact
        </Link>
      </div>
      <div className="p-1">
        <Icons icon="twitter" link={true} />
      </div>
      <div className="p-1">
        <Icons icon="github" link={true} />
      </div>
    </div>
  </nav>
)

export default Navigation