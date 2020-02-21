import React, { Component } from "react"
import auth from "./../utils/auth"
import { loginUser } from "./../utils/crud"

import { SimpleError } from "./../components/Errors"

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: "",
  }

  validateForm() {
    const { username, password } = this.state
    if (username.length < 3 || username.length > 32) {
      return "Username must contain 2 - 32 symbols in it."
    }
    if (password.length < 6 || password.length > 32) {
      return "Password must contain 6 - 32 symbols in it (without spaces)."
    }
    return ""
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value.trim(),
      error: "",
    })
  }

  handleFormSubmit = async e => {
    e.preventDefault()
    const error = this.validateForm()
    if (error !== "") {
      this.setState({ error })
      return
    }
    const err = await loginUser(
      this.state.username,
      this.state.password,
    )
    if (err !== "") {
      this.setState({ error: err })
      return
    }
    auth.authStatus = true
    this.props.history.push("/1")
  }

  render() {
    return (
      <form className="row" onSubmit={this.handleFormSubmit}>
        <div className="col s6 push-s3 center-align white-text">
          <h4>Login form</h4>
          <div className="row left-align">
            <div className="col s12">
              <div className="input-field ">
                <input
                  onChange={this.inputChangeHandler}
                  value={this.state.username}
                  name="username"
                  type="text"
                  data-length="32"
                  className="white-text"
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="input-field">
                <input
                  onChange={this.inputChangeHandler}
                  value={this.state.password}
                  name="password"
                  type="password"
                  className="validate white-text"
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="col s12">
              {this.state.error && (
                <SimpleError error={this.state.error} />
              )}
            </div>
            <div className="col s12">
              <button className="btn blue" type="submit">
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default Login
