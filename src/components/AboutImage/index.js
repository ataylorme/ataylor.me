import React from "react"
const mediaURL = 'https://media.ataylor.me/andrew-taylor-professional-headshot-square';

const AboutImage = () => (
  <div className="alignright img-wrap">
    <picture>
      <source media="(min-width: 1025px)" srcSet={`${mediaURL}/andrew-taylor-professional-headshot-square-04-2015.jpg`} />
      <source media="(min-width: 826px)" srcSet={`${mediaURL}/andrew-taylor-professional-headshot-square-04-2015.jpg?w=1024&h=1024`} />
      <source media="(min-width: 701px)" srcSet={`${mediaURL}/andrew-taylor-professional-headshot-square-04-2015.jpg?w=825&h=825`} />
      <source media="(min-width: 601px)" srcSet={`${mediaURL}/andrew-taylor-professional-headshot-square-04-2015.jpg?w=700&h=700`} />
      <source media="(min-width: 501px)" srcSet={`${mediaURL}/andrew-taylor-professional-headshot-square-04-2015.jpg?w=600&h=600`} />
      <source media="(min-width: 401px)" srcSet={`${mediaURL}/andrew-taylor-professional-headshot-square-04-2015.jpg?w=500&h=500`} />
      <source media="(min-width: 321px)" srcSet={`${mediaURL}/andrew-taylor-professional-headshot-square-04-2015.jpg?w=400&h=400`} />
      <source media="(min-width: 151px)" srcSet={`${mediaURL}/andrew-taylor-professional-headshot-square-04-2015.jpg?w=320&h=320`} />
      <source media="(max-width: 150px)" srcSet={`${mediaURL}/andrew-taylor-professional-headshot-square-04-2015.jpg?w=150&h=150`} />
      <img alt="Andrew Taylor" />
    </picture>
  </div>
    )

export default AboutImage
