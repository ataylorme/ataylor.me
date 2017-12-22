import React from 'react'

require('../global.scss')

export default class Template extends React.Component {
  render() {
    const { children } = this.props
    return <div>{children()}</div>
  }
}
