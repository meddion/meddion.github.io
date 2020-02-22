import React, { Component } from "react"

export default class EmailForm extends Component {
  state = {
    name: "",
    email: "",
    message: "",
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value.trimLeft() })
    if (e.target.name === "message") {
      window.scrollTo(0, document.body.scrollHeight)
    }
  }

  handleHTMLFormSubmit = async e => {
    e.preventDefault()
    // TO DO: MAKE EMAIL FORM WORK!
  }

  render() {
    return (
      <form id="email-form" onSubmit={this.handleHTMLFormSubmit}>
        <div className="input-field">
          <input
            onChange={this.inputChangeHandler}
            value={this.state.name}
            className="white-text"
            name="name"
            id="name"
            type="text"
          />
          <label htmlFor="name">Your name</label>
        </div>
        <div className="input-field">
          <input
            onChange={this.inputChangeHandler}
            value={this.state.email}
            className="white-text"
            name="email"
            id="email"
            type="email"
          />
          <label htmlFor="email">Your email</label>
        </div>
        <div className="input-field">
          <textarea
            onChange={this.inputChangeHandler}
            value={this.state.message}
            name="message"
            id="message"
            className="materialize-textarea white-text"
            cols="30"
            rows="10"
          ></textarea>
          <label htmlFor="message">Your message</label>
        </div>
        <div id="submit" className="input-field left">
          <button className="btn-large blue">Send</button>
        </div>
      </form>
    )
  }
}
