import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'

import { Team } from '../api/team.js'
import Message from './components/Message.jsx'
import Select from './components/Select.jsx'

export default class Teams extends Component {
  componentDidMount() {
    Materialize.updateTextFields()
    $('select').material_select()
  }

  _submit(event) {
    event.preventDefault()
    const team = ReactDOM.findDOMNode(this.refs.name).value.trim()

    Team.insert({
      team,
      createdAt: new Date()
    })
    // Clear form
    ReactDOM.findDOMNode(this.refs.teamInput).value = ''
  }

  _renderCollection() {
    return this.props.teams.map((team) => (
      <tr key={team._id}>
        <td>Jonathan</td>
        <td>Lollipop</td>
        <td>$7.00</td>
      </tr>
    ))
  }

  render() {
    const people = [
      {id:'1', text:'Greg'},
      {id:'2', text:'Aaron'},
      {id:'3', text:'Mehul'}
    ]

    return (
      <div>
        {/* Add team */}
        <form className="card" onSubmit={this._submit.bind(this)}>
          <div className="row card-content">
            <div className="input-field col s12 m5">
              <input id="name" ref="name" type="text" pattern="\w+[\w\s-]+\w+" className="validate" />
              <label for="name">Team</label>
            </div>
            <div className="input-field col s12 m4">
              <Select data={people} label="Managers" multiple={true} />
            </div>
            <div className="input-field col s6 m3">
              <a className="waves-effect waves-light btn col right"><i className="material-icons left">group_add</i>Create</a>
            </div>

          </div>
        </form>
        {/* Existing teams */}
        <table className="bordered highlight">
          <thead>
            <tr>
              <th data-field="name">Team</th>
              <th data-field="manager">Managers</th>
              <th data-field="staff">Staff</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {this._renderCollection()}
          </tbody>

        </table>
        {!this.props.teams.length ? <Message>No teams have been created yet!</Message> : ''}
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    teams: Team.find({}, { sort: { name: 1 } }).fetch(),
  }
}, Teams)
