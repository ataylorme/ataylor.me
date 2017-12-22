import React from 'react'
import Img from 'gatsby-image'

require('./index.scss')

export default props => {
  let { title, image } = props

  if (image === null || image === undefined) {
    return null
  }

  return (
    <div id="hero">
      <div className="title">
        <h1>{title}</h1>
      </div>
      <div className="heroImg">
        <Img sizes={image.childImageSharp.sizes} />
      </div>
    </div>
  )
}
