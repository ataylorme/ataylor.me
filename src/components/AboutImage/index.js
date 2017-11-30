import React from "react"
const mediaURL = 'https://media.ataylor.me/andrew-taylor-professional-headshot-square';
const aboutImg = require('./andrew-taylor-professional-headshot-square-04-2015.png');
const aboutImg1024 = require('./andrew-taylor-professional-headshot-square-04-2015-1024x1024.png');
const aboutImg825 = require('./andrew-taylor-professional-headshot-square-04-2015-825x825.png');
const aboutImg700 = require('./andrew-taylor-professional-headshot-square-04-2015-700x700.png');
const aboutImg600 = require('./andrew-taylor-professional-headshot-square-04-2015-600x600.png');
const aboutImg500 = require('./andrew-taylor-professional-headshot-square-04-2015-500x500.png');
const aboutImg400 = require('./andrew-taylor-professional-headshot-square-04-2015-400x400.png');
const aboutImg320 = require('./andrew-taylor-professional-headshot-square-04-2015-320x320.png');
const aboutImg150 = require('./andrew-taylor-professional-headshot-square-04-2015-150x150.png');

const AboutImage = () => (
  <div className="alignright img-wrap">
    <picture>
      <source media="(min-width: 1025px)" srcSet={`${aboutImg}`} />
      <source media="(min-width: 826px)" srcSet={`${aboutImg1024}`} />
      <source media="(min-width: 701px)" srcSet={`${aboutImg825}`} />
      <source media="(min-width: 601px)" srcSet={`${aboutImg700}`} />
      <source media="(min-width: 501px)" srcSet={`${aboutImg600}`} />
      <source media="(min-width: 401px)" srcSet={`${aboutImg500}`} />
      <source media="(min-width: 321px)" srcSet={`${aboutImg400}`} />
      <source media="(min-width: 151px)" srcSet={`${aboutImg320}`} />
      <source media="(max-width: 150px)" srcSet={`${aboutImg150}`} />
      <img alt="Andrew Taylor" />
    </picture>
  </div>
    )

export default AboutImage
