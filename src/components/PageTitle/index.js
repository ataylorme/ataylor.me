import React from 'react'
require('./index.scss')

export default props => {
  if (props.hero !== null || props.title === null) {
    return null
  }
  return <h1 className="title">{props.title}</h1>
}
