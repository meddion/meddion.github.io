import React, { Fragment } from "react"
import { withRouter, Link } from "react-router-dom"

import { AppContext } from "../../utils/helpers"

import SocialList from "./../SocialList"
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
            <span className="flow-text">
              {process.env.REACT_APP_SITE_TITLE}
            </span>
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

      <ul id="mobile-links" className="sidenav grey darken-4">
        <ul className="grey darken-3">
          <li>
            <a className="subheader grey-text text-darken-1">Menu</a>
          </li>
          <Links />
          <li>
            <div className="divider grey"></div>
          </li>
        </ul>

        <li>
          <a className="subheader grey-text text-darken-1">
            Me on socials
          </a>
        </li>
        <SocialList />
      </ul>
    </header>
  )
}

const Links = () => (
  <Fragment>
    <li>
      <Link to="/1" className="sidenav-close waves-effect">
        <span>Feed</span>
      </Link>
    </li>

    <li>
      <Link to="/about" className="sidenav-close waves-effect">
        About me
      </Link>
    </li>
    <li>
      <AppContext.Consumer>
        {({ isAuthorized }) =>
          isAuthorized ? (
            <Link to="/logout" className="sidenav-close waves-effect">
              Logout
            </Link>
          ) : (
            <Link to="/login" className="sidenav-close waves-effect">
              Login
            </Link>
          )
        }
      </AppContext.Consumer>
    </li>
  </Fragment>
)

export default withRouter(Header)
