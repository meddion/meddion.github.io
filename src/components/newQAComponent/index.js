import React, { Component } from "react"

import { SimpleError } from "../Errors"
import "./newQAComponent.css"

export default (question, action) =>
  class extends Component {
    state = {
      error: "",
    }

    buttonHandler = async props => {
      try {
        await action(props)
      } catch (error) {
        this.setState({ error: error.message })
      }
    }

    render() {
      return (
        <div id="qa-component" className="row valign-wrapper">
          <div className="col s6 offset-s3">
            <div className="row center-align">
              {this.state.error && <SimpleError error={this.state.error} />}
              <div id="title" className="col s12 center-align white-text">
                <h4>{question}</h4>
              </div>
              <div className="col s12 m6 right-align btnDiv">
                <button
                  onClick={this.props.history.goBack}
                  className="btn btn-large waves-effect waves-light green"
                >
                  Cancel
                </button>
              </div>
              <div className="col s12 m6 left-align btnDiv">
                <button
                  onClick={() => this.buttonHandler(this.props)}
                  type="button"
                  className="btn btn-large waves-effect waves-light blue"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
