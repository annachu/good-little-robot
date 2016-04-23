import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'

import { Person } from '../api/person.js'
import Message from './components/Message.jsx'
import Select from './components/Select.jsx'

export default class People extends Component {

  _renderCollection() {
    return this.props.people.map((person) => (
      <tr key={person._id}>
        <td>{person.name}</td>
        <td >{person.email}</td>
        <td>{person.team}</td>
        <td>{person.role}</td>
        <td>${person.rate}/hr</td>
        <td>{person.source}</td>
        <td><i className="material-icons">close</i></td>
      </tr>
    ))
  }

  render() {
    return (
      <div>
        <div className="card" >
          {/* Tabs */}
          <ul className="tabs">
            <li className="tab"><a href="#local">Local</a></li>
            <li className="tab"><a href="#ldap">Active Directory</a></li>
          </ul>
          <div className="row card-content">

            {/* Local */}
            <div id="local" className="col s12">
              <Local />
            </div>

            {/* LDAP */}
            <div id="ldap" className="col s12">
              <LDAP />
            </div>
          </div>
        </div>

        {/* Existing teams */}
        <table className="bordered highlight">
          <thead>
            <tr>
              <th data-field="name">Name</th>
              <th data-field="email">Email</th>
              <th data-field="team">Team</th>
              <th data-field="role">Role</th>
              <th data-field="rate">Rate</th>
              <th data-field="source">Source</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {this._renderCollection()}
          </tbody>

        </table>
        {!this.props.people.length ? <Message>No people have been added yet!</Message> : ''}
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    people: Person.find({}, { sort: { name: 1 } }).fetch(),
  }
}, People)

class Local extends Component {
  constructor(props) {
    super(props)
    this.state = {isAdmin:false}
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

  /**
  * Toggle administrator checkbox
  */
  _check() {
    this.setState({isAdmin:!this.state.isAdmin})
  }

  render() {
    const teams = [
      {id:'1', text:'Informatics'},
      {id:'2', text:'Lab'},
      {id:'3', text:'Clinical'}
    ]

    return (
      <form onSubmit={this._submit.bind(this)}>
        <div className="row">
          <div className="input-field col s12 m4">
            <input id="name" ref="name" type="text" pattern="\w+[\w'\s-]+\w+" className="validate" />
            <label for="name">Name</label>
          </div>
          <div className="input-field col s12 m4">
            <input id="name" ref="name" type="email" className="validate" />
            <label for="name">Email</label>
          </div>
          <div className="input-field col s12 m4">
            <Select data={teams} label="Team" />
          </div>
          <div className="input-field col s12 m4">
            <i className="material-icons prefix">attach_money</i>
            <input id="rate" ref="rate" type="number" className="validate" step="0.01"/>
            <label for="name">Hourly Rate</label>
          </div>
          <div className="input-field col s6 m4" onClick={this._check.bind(this)}>
            <input type="checkbox" className="filled-in" id="isAdmin" checked={this.state.isAdmin} />
            <label for="isAdminx">Administrator</label>
          </div>
          <div className="input-field col s6 m4">
            <a className="waves-effect waves-light btn right"><i className="material-icons left">person_add</i>Add</a>
          </div>
        </div>
      </form>
    )
  }
}

class LDAP extends Component {
  constructor(props) {
    super(props)
    this.state = {ssl:false}
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

  /**
  * Toggle administrator checkbox
  */
  _check() {
    this.setState({ssl:!this.state.ssl})
  }

  render() {
    return (
      <form onSubmit={this._submit.bind(this)}>
        <div className="row">
          <div className="input-field col s12 m4">
            <input id="hostname" ref="hostname" type="text" pattern="(http(s)*:\/\/)*[\w+\.]+\.\w+" className="validate" />
            <label for="hostname">Hostname</label>
          </div>
          <div className="input-field col s6 m2">
            <input id="port" ref="port" type="number" className="validate" />
            <label for="port">Port</label>
          </div>
          <div className="input-field col s6 m6" onClick={this._check.bind(this)}>
            <input type="checkbox" className="filled-in" id="ssl" checked={this.state.ssl} />
            <label for="ssl">Use SSL</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m4">
            <input id="username" ref="username" type="text" />
            <label for="username">Username</label>
          </div>
          <div className="input-field col s12 m4">
            <input id="password" ref="password" type="password" className="validate"/>
            <label for="password">Password</label>
          </div>
          <div className="input-field col s12 m4">
            <input id="baseDN" ref="baseDN" type="text" />
            <label for="baseDN">Base DN</label>
          </div>
          <div className="input-field col s12 m4">
            <input id="userDN" ref="userDN" type="text" />
            <label for="userDN">User DN</label>
          </div>
          <div className="input-field col s12 m4">
            <input id="groupDN" ref="groupDN" type="text" />
            <label for="groupDN">Group DN</label>
          </div>
          <div className="input-field col s12 m4">
            {/* When test is successful, swap test button with connection button (use icon: cast_connected)*/}
            <a className="waves-effect waves-light btn right"><i className="material-icons left">cast</i>Test connection</a>
          </div>
        </div>
      </form>
    )
  }
}
