import React from 'react';
import Img from 'gatsby-image'
const ImageGrid = ({ images }) => {
  return (
    <div className="image-grid">
      {images.map((img, i) => {
        console.log(img)
        if (!img.src) {
          if (process.env.NODE_ENV !== 'production') {
            // this gets removed in production, so don't worry
            console.error(`This image is missing "src", you probably messed up the path to it: ${img}`)
            return (
              <React.Fragment>
                Missing Image {i} Source
              </React.Fragment>
            )
          } else {
            return null
          }
        }
        return (
          <React.Fragment key={i}>
            <Img className="w-full block rounded shadow-md" fluid={img.src.full.fluid} />
          </React.Fragment>
        )
      })}
    </div>
  )
}
export default ImageGrid