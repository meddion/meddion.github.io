import React, { Component } from "react"
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"
import M from "materialize-css"

import auth from "./../utils/auth"
import { AppContext } from "../utils/helpers"

import { insideContainer, insideSection } from "./Reusable"
import Header from "./Header"
import Feed from "./../pages/Feed"
import Post from "./../pages/Post"
import DeletePost from "./../pages/DeletePost"
import About from "./../pages/About"
import Login from "./../pages/Login"
import Logout from "./../pages/Logout"
import Page404 from "./../pages/Page404"

export default class App extends Component {
  state = {
    isAuthorized: false,
  }

  componentDidMount() {
    auth.stateChange.subscribe(isAuthorized =>
      this.setState({ isAuthorized }),
    )
    M.Sidenav.init(document.querySelectorAll(".sidenav"))
  }
  render() {
    return (
      <AppContext.Provider
        value={{ isAuthorized: this.state.isAuthorized }}
      >
        <Router>
          <Header />
          <Switch>
            <ProtectedRoute
              exact
              path="/logout"
              redirect="/login"
              component={Logout}
            />
            <NeedToBeUnauthorizedToSeeRoute
              exact
              path="/login"
              redirect="/"
              component={Login}
            />
            <ProtectedRoute
              exact
              path="/post/:id/delete"
              redirect="/login"
              component={DeletePost}
            />
            <Route exact path="/about" component={About} />
            <PageRoute exact path="/post/:id" component={Post} />
            <PageRoute exact path="/:id?" component={Feed} />
            <PageRoute path="*" component={Page404} />
          </Switch>
        </Router>
      </AppContext.Provider>
    )
  }
}

const PageRoute = ({ component, ...rest }) => {
  const PageComponent = insideSection(insideContainer(component))
  return (
    <Route {...rest} render={props => <PageComponent {...props} />} />
  )
}

const ProtectedRoute = ({ redirect, ...rest }) => {
  return (
    <AppContext.Consumer>
      {({ isAuthorized }) =>
        !isAuthorized ? (
          <Redirect to={redirect} />
        ) : (
          <PageRoute {...rest} />
        )
      }
    </AppContext.Consumer>
  )
}

const NeedToBeUnauthorizedToSeeRoute = ({ ...rest }) => {
  return (
    <AppContext.Consumer>
      {({ isAuthorized }) => (
        <AppContext.Provider value={{ isAuthorized: !isAuthorized }}>
          <ProtectedRoute {...rest} />
        </AppContext.Provider>
      )}
    </AppContext.Consumer>
  )
}
