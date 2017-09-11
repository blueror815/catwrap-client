import React, { Component, PropTypes } from 'react'
import FbLogin from './FbLogin'
import * as C from './styledComponents'



export default class Picker extends Component {
  render() {
    const { onChange, options } = this.props

    return (
      <C.Navigation>
        <ul>
          <C.NavItem key='All' onClick={e => onChange('')}>All</C.NavItem>
          {options.map(option =>
            <C.NavItem key={option} onClick={e => onChange(option)}>{option}</C.NavItem>
          )}
        </ul>
        <C.FacebookButtonCotainer>
          <FbLogin></FbLogin>
        </C.FacebookButtonCotainer>
      </C.Navigation>
    )
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  //value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
