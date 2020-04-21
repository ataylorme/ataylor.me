import React from 'react';
import Img from 'gatsby-image'
import '@brainhubeu/react-carousel/lib/style.css'

const Card = ({ children, id, image, direction = "left" }) => {
  const textCard = (
    <div className="w-full md:w-1/2">
      <div className="px-3 py-2">
        {children}
      </div>
    </div>
  )
  const heroCard = (
    <div className="w-full md:w-1/2">
      <Img
        className="w-full"
        fluid={image.childImageSharp.fluid}
        style={{
          minWidth: 250
        }}
      />
    </div>
  )
  const card = (direction === "left") ? (<React.Fragment>{heroCard}{textCard}</React.Fragment>) : (<React.Fragment>{textCard}{heroCard}</React.Fragment>)
  return (
    <div key={id} className="flex flex-wrap my-4 rounded overflow-hidden shadow-md">
      {card}
    </div>
  )
}
export default Card