import React from 'react'
import Img from 'gatsby-image'

export default props => {
  let { title, image } = props

  if (image === null || image === undefined) {
    return null
  }

  return (
    <section className="relative flex items-center justify-center py-8 px-4 h-32 md:h-48 lg:h-64 text-center">
      <div className=" absolute inset-0 z-20 opacity-25 bg-black"></div>
      <div className="z-30 text-white py-4 container mx-auto">
        <h1>{title}</h1>
      </div>
      <div className="absolute inset-0 h-auto z-10">
        <Img
          fluid={image.childImageSharp.fluid}
          objectFit="cover"
          className="h-full w-full object-fit-cover"
        />
      </div>
    </section>
  )
}
