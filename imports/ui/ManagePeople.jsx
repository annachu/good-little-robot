import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import People from './People.jsx'
import Teams from './Teams.jsx'

export default class ManagePeople extends Component {
  componentDidMount() {
    $('ul.tabs').tabs()
  }

  render() {
    return (
      <div className="row">
        {/* Tabs */}
        <div className="col s6" style={{marginTop:'2rem', marginBottom:'1rem'}}>
          <ul className="tabs flow-text">
            <li className="tab"><a href="#people">People</a></li>
            <li className="tab"><a href="#teams">Teams</a></li>
          </ul>
        </div>

        {/* People */}
        <div id="people" className="col s12">
          <People />
        </div>

        {/* Teams */}
        <div id="teams" className="col s12">
          <Teams />
        </div>

      </div>
    )
  }
}
