import React, { Component } from "react"

import { createPost } from "../../utils/crud"
import { validatePost } from "../../utils/helpers"

import { SimpleError } from "../Errors"
import { PostEdit } from "../Post"
import "./CreatePost.css"

export default class CreatePost extends Component {
  state = {
    editTitle: "",
    editContent: "",
    error: "",
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value, errorMsg: "" })
  }

  handleFormSubmit = async e => {
    e.preventDefault()
    const editTitle = this.state.editTitle.trim()
    const editContent = this.state.editContent.trim()
    const validateError = validatePost(editTitle, editContent)
    if (validateError !== "") {
      this.setState({ error: validateError })
      return
    }

    let newPost = {
      title: editTitle,
      content: editContent,
    }

    const resp = await createPost(newPost)

    if (resp.error !== "") {
      console.error(resp.error)
      this.setState({ error: resp.error })
      return
    }

    this.props.appendPostHandler({
      ...newPost,
      id: resp.body.id,
      creation_time: Date.now() / 1000,
      last_edited: 0,
    })

    this.setState({
      editTitle: "",
      editContent: "",
    })
  }

  render() {
    let btnDisabled = ""
    if (this.state.editContent.trim().length === 0) {
      btnDisabled = "disabled"
    }
    return (
      <div id="create-post" className="row">
        <div className="col s8 offset-s2">
          <div className="row">
            {this.state.error && (
              <div className="col s12">
                <SimpleError error={this.state.error} />
              </div>
            )}
            <form onSubmit={this.handleFormSubmit}>
              <div className="col s12">
                <PostEdit
                  title={this.state.editTitle}
                  content={this.state.editContent}
                  inputChangeHandler={this.inputChangeHandler}
                />
              </div>
              <div className="col s12">
                <div id="create-post-footer" className="input-field right">
                  <button className={`btn blue ${btnDisabled}`}>Post</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
