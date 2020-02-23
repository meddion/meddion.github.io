import React, { Component } from "react"

import { SimpleError } from "../Errors"
import "./newQAComponent.css"

export default (question, confirmAction, cancelAction) =>
  class extends Component {
    state = {
      error: "",
    }

    confirmBtnHandler = async props => {
      try {
        await confirmAction(props)
      } catch (error) {
        this.setState({ error: error.message })
      }
    }

    cancelBtnHandler = props => {
      if (cancelAction) {
        cancelAction(props)
        return
      }
      props.history.goBack() // by default
    }

    render() {
      return (
        <div id="qa-component" className="row valign-wrapper">
          <div className="col s6 offset-s3">
            <div className="row center-align">
              {this.state.error && (
                <SimpleError error={this.state.error} />
              )}
              <div
                id="title"
                className="col s12 center-align white-text"
              >
                <h4>{question}</h4>
              </div>
              <div className="col s12 m6 right-align btnDiv">
                <button
                  onClick={() => this.cancelBtnHandler(this.props)}
                  className="btn btn-large waves-effect waves-light green"
                >
                  Cancel
                </button>
              </div>
              <div className="col s12 m6 left-align btnDiv">
                <button
                  onClick={() => this.confirmBtnHandler(this.props)}
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
