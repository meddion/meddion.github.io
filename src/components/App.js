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

const PostAdvanced = insideSection(Post)
const FeedAdvanced = insideSection(Feed)
const LogoutAdvanced = insideSection(Logout)
const DeletePostAdvanced = insideSection(DeletePost)
const LoginAdvanced = insideSection(insideContainer(Login))
const Page404Advanced = insideSection(insideContainer(Page404))

export default class App extends Component {
  static sub = null
  state = {
    isAuthorized: false,
    sub: null,
  }

  componentDidMount() {
    this.sub = auth.stateChange.subscribe(isAuthorized =>
      this.setState({ isAuthorized }),
    )

    M.Sidenav.init(document.querySelectorAll(".sidenav"))
  }

  componentWillUnmount() {
    this.sub.unsubscribe()
  }

  render() {
    return (
      <AppContext.Provider
        value={{ isAuthorized: this.state.isAuthorized }}
      >
        <Router>
          <Header />
          <Switch>
            <NeedToBeUnauthorizedToSeeRoute
              exact
              path="/login"
              redirect="/"
              component={LoginAdvanced}
            />
            <ProtectedRoute
              exact
              path="/logout"
              redirect="/login"
              component={LogoutAdvanced}
            />
            <ProtectedRoute
              exact
              path="/post/:id/delete"
              redirect="/login"
              component={DeletePostAdvanced}
            />
            <Route exact path="/about" component={About} />
            <Route exact path="/post/:id" component={PostAdvanced} />
            <Route exact path="/:id?" component={FeedAdvanced} />
            <Route path="*" component={Page404Advanced} />
          </Switch>
        </Router>
      </AppContext.Provider>
    )
  }
}
const ProtectedRoute = ({ redirect, ...rest }) => {
  return (
    <AppContext.Consumer>
      {({ isAuthorized }) =>
        !isAuthorized ? (
          <Redirect to={redirect} />
        ) : (
          <Route {...rest} />
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
