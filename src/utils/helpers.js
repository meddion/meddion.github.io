import React from "react"

const AppContext = React.createContext()

function validatePost(title, content) {
  if (content === "") {
    return "The content of the post cannot be empty."
  }
  if (title.length > 70) {
    return "Title couldn't be more then 70 symbols long."
  }
  if (content.length > 10000) {
    return "The content of the post couldn't be more then 10000 symbols long."
  }
  return ""
}

export { validatePost, AppContext }
