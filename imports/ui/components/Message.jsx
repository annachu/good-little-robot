import React, { Component, PropTypes } from 'react'

export default class Message extends Component {
  render() {
    return (
      <div className="center-align message">
        <div className="chip">{this.props.children}</div>
      </div>
    )
  }
}

Message.propTypes = {
  children: PropTypes.string.isRequired,
}
