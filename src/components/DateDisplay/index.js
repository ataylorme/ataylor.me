import React from 'react'
require('./index.scss')

export default props => {
  if (props.date === null) {
    return null
  }
  return <div className="date">{props.date}</div>
}
