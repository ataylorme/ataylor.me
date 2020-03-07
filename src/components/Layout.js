import React from 'react'

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div id="main" className="max-w-6xl mx-auto px-5 py-10">
        {children}
      </div>
    )
  }
}

export default Layout