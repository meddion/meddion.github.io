import React, { Fragment } from "react"
import { withRouter, Link } from "react-router-dom"

import { AppContext } from "../../utils/helpers"

import "./Header.css"

const picNames = ["night", "lands", "blooming"]

const Header = ({ location }) => {
  let headerStyle
  if (location.pathname === "/about") {
    headerStyle = {
      backgroundImage: "url(/images/header_background/flowers.jpg)",
      minHeight: " 450px",
    }
  } else if (
    location.pathname === "/" ||
    location.pathname === "/1"
  ) {
    headerStyle = {
      backgroundImage: `url(/images/header_background/${
        picNames[Math.floor(Math.random() * picNames.length)]
      }.jpg)`,
      minHeight: " 250px",
    }
  }
  return (
    <header style={headerStyle}>
      <nav className="nav-wrapper transparent">
        <div className="container">
          <Link to="/1" className="brand-logo">
            <div className="flow-text">
              {process.env.REACT_APP_SITE_TITLE}
            </div>
          </Link>
          <a
            href="#menu"
            className="sidenav-trigger"
            data-target="mobile-links"
          >
            <i className="material-icons">menu</i>
          </a>
          <ul id="link-list" className="hide-on-med-and-down right">
            <Links />
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-links">
        <Links />
      </ul>
    </header>
  )
}

const Links = () => (
  <Fragment>
    <li>
      <Link to="/1" className="sidenav-close">
        <span>Feed</span>
      </Link>
    </li>

    <li>
      <Link to="/about" className="sidenav-close">
        About me
      </Link>
    </li>
    <li>
      <AppContext.Consumer>
        {({ isAuthorized }) =>
          isAuthorized ? (
            <Link to="/logout" className="sidenav-close">
              Logout
            </Link>
          ) : (
            <Link to="/login" className="sidenav-close">
              Login
            </Link>
          )
        }
      </AppContext.Consumer>
    </li>
  </Fragment>
)

export default withRouter(Header)
