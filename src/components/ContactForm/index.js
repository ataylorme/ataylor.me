import React from 'react'
import WufooForm from 'react-wufoo-embed'

require('./index.scss')

export default props => {
  if (props.path !== '/contact/') {
    return null
  }
  return (
    <div>
      <WufooForm
        userName="andrewtaylor"
        formHash="zrn1v6d0ksmh80"
        header="hide"
      />
      <hr />
      <small>
        Form by{' '}
        <a href="https://wufoo.com" target="_blank">
          Wufoo
        </a>
      </small>
    </div>
  )
}
