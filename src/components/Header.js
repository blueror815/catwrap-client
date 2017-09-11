import React, { Component, PropTypes } from 'react'
import * as C from './styledComponents'
import { Link } from 'react-router-dom'
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import FbLogin from './FbLogin'


export default class Header extends Component {
  render() {
    const { options } = this.props

    return (
      <C.Navbar fixedTop inverse collapseOnSelect>
          <Navbar.Header>
              <Navbar.Brand>
                  <Link to="/"><C.Logo alt='Catwrap' class="img-responsive" src='/image/logo.png' /></Link>
              </Navbar.Brand>
              <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse eventKey={0}>
              <Nav pullRight>
                  <C.NavItem><Link to="/">All</Link></C.NavItem>
                  {options.map((option, index) =>
                      <C.NavItem><Link  eventKey={index} to={"/" + option}>{option}</Link></C.NavItem>
                  )}
                  <C.NavItem>
                      <C.FacebookButtonCotainer>
                          <FbLogin></FbLogin>
                      </C.FacebookButtonCotainer>
                  </C.NavItem>
              </Nav>
          </Navbar.Collapse>
      </C.Navbar>
    )
  }
}

Header.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  //value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
