import React, { Component, PropTypes } from 'react'

export default class Clients extends Component {
  getTasks() {
    return [
      { _id: 1, text: 'This is task 1' },
      { _id: 2, text: 'This is task 2' },
      { _id: 3, text: 'This is task 3' },
    ]
  }

  renderTasks() {
    return this.getTasks().map((task) => (
      <li key={task._id} task={task}>{task.text}</li>
    ))
  }

  render() {
    return (
      <div>
        <h1>Clients</h1>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    )
  }
}

// Clients.propTypes = {
//   // This component gets the task to display through a React prop.
//   // We can use propTypes to indicate it is required
//   task: PropTypes.object.isRequired,
// }
