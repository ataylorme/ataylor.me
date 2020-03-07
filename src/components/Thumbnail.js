import React from 'react'
import Image from 'gatsby-image'

export default props => {
  const { image } = props
  if (image === null) {
    return null
  }

  return (
    <div>
      <Image
        className="mr-4 mb-0"
        fixed={image.childImageSharp.fixed}
        style={{
          minWidth: 50
        }}
      />
    </div>
  )
}