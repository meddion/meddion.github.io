import React from "react"

import "./Errors.css"

const SimpleError = ({ error }) => {
  return (
    <div id="simple-error" className="grey darken-4">
      <p>{error}</p>
    </div>
  )
}

const TitledErrorBlock = ({ title, content }) => (
  <div id="error-block" className="row grey darken-4 white-text">
    <div className="col s12 z-depth-1">
      <h3>{title}</h3>
      <p className="flow-text">{content}</p>
    </div>
  </div>
)

const MinimalisticError = ({ content }) => (
  <div className="row">
    <div className="col s12 z-depth-0 center-align">
      <p className="grey-text ">{content}</p>
    </div>
  </div>
)

const withErrorBlock = ErrorBlock => Component => ({
  errorTitle = "Oppss",
  errorContent = "Something went wrong...",
  isError,
  ...rest
}) => {
  if (isError) {
    return <ErrorBlock title={errorTitle} content={errorContent} />
  }
  return <Component {...rest} />
}

const withDefaultErrorBlock = withErrorBlock(TitledErrorBlock)

export {
  SimpleError,
  TitledErrorBlock,
  MinimalisticError,
  withDefaultErrorBlock,
  withErrorBlock,
}
