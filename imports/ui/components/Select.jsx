import React, { Component, PropTypes } from 'react'

export default class Select extends Component {
  constructor(props) {
    super(props)
    this.state={hasValue:false}
  }

  componentDidMount() {
    $(`#${this.props.label}`).material_select()
    $(`#${this.props.label}`).change((e) => {
      if (e.target.value) {
        this.setState({hasValue:true})
        // Note: This doesn't work for selects with multiple
        // The 'active' class is added briefly and is removed by a refresh
        $(`#${this.props.label}`).parent().find('.select-dropdown').addClass("active")
      }
    })
  }

  _renderCollection() {
    return this.props.data.map((option) => (
      <option key={option.id} value={option.id}>{option.text}</option>
    ))
  }

  render() {
    return (
      <div>
        <select id={this.props.label} defaultValue={this.props.multiple ? [] : ''} multiple={this.props.multiple}>
          <option value="" disabled>{this.props.label}</option>
          {this._renderCollection()}
        </select>
        {this.state.hasValue ? <label>{this.props.label}</label> : ''}
      </div>
    )
  }
}

Select.propTypes = {
  data: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired
    })
  ),
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool
}
