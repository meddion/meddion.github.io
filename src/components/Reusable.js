import React from "react"

const insideContainer = Component => props => (
  <div className="container">
    <Component {...props} />
  </div>
)

const insideSection = Component => props => (
  <section className="section">
    <Component {...props} />
  </section>
)

export { insideContainer, insideSection }
