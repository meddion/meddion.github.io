import React from "react"
import ReactLoading from "react-loading"

const LoadingBlock = ({ color = "grey", size = "32" }) => (
  <ReactLoading
    id="loading-block"
    className="row"
    type="spin"
    color={color}
    height={`${size}px`}
    width={`${size}px`}
  />
)

const withLoadingBlock = Component => ({ isLoading, ...rest }) => {
  if (isLoading) {
    return <LoadingBlock />
  }
  return <Component {...rest} />
}

export { LoadingBlock, withLoadingBlock }
