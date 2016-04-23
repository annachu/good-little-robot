import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'

/**
* React Router can detect when a Link is active. However, this needs to be
* propagated up to the parent <li> wrapping <Link>
*/
class NavItem extends Component {

  render() {
    // Current path matches target path
    const isActive = window.location.pathname.includes(this.props.to)
    return (
      <li className={isActive ? 'active' : ''}>
        <Link {...this.props}>{this.props.children}</Link>
      </li>
    )
  }
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
}

/**
 * Static header
 */
export default class Header extends Component {
  componentDidMount() {
    $(".dropdown-button").dropdown()
    $('.collapsible').collapsible()
    $(".button-collapse").sideNav({
      closeOnClick: true
    })
  }

  render() {
    return (
      <div className="navbar-fixed">
        {/* Dropdown Structure */}
        <ul id="manageMenu" className="dropdown-content">
          <NavItem to="/manage/projects"><i className="material-icons left">work</i>Projects</NavItem>
          <NavItem to="/manage/people"><i className="material-icons left">face</i>People</NavItem>
        </ul>
        <nav>
          {/* Desktop navbar */}
          <div className="nav-wrapper">
            {/* Logo */}
            <IndexLink to="/" className="brand-logo"><i className="material-icons left">adb</i>Good Little Robot</IndexLink>
            {/* Hamburger */}
            <a href="#" data-activates="mobile-menu" className="button-collapse"><i className="material-icons">menu</i></a>
            {/* Nav menu */}
            <ul className="right hide-on-med-and-down">
              <NavItem to="/track"><i className="material-icons left">history</i>Track</NavItem>
              <NavItem to="/report"><i className="material-icons left">show_chart</i>Report</NavItem>
              <NavItem to="manage" onClick={e => e.preventDefault()} className="dropdown-button" data-activates="manageMenu" data-beloworigin="true">
                <i className="material-icons left">settings</i>Manage<i className="material-icons right">arrow_drop_down</i>
              </NavItem>
              <li>
                {/* Logged in user */}
                <span className="grey-text text-darken-2">Jane Doe</span>
                {/* Sign out button */}
                <a className="waves-effect waves-light btn z-depth-0 grey darken-2">Sign out</a>
              </li>
            </ul>
            {/* Mobile sidebar */}
            <ul className="side-nav collapsible" id="mobile-menu" data-collapsible="expandable">
              <NavItem to="/track"><i className="material-icons left">history</i>Track</NavItem>
              <NavItem to="/report"><i className="material-icons left">show_chart</i>Report</NavItem>
              <li>
                <div className="collapsible-header active"><i className="material-icons left">settings</i>Manage</div>
                <div className="collapsible-body">
                  <ul>
                    <NavItem to="/manage/projects"><i className="material-icons left">work</i>Projects</NavItem>
                    <NavItem to="/manage/people"><i className="material-icons left">face</i>People</NavItem>
                  </ul>
                </div>
              </li>
            </ul>

          </div>
        </nav>
      </div>
    )
  }
}
