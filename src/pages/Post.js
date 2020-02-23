import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import queryString from "query-string"

import { validatePost, AppContext } from "../utils/helpers"
import { fetchPost, updatePost } from "./../utils/crud"

import { LoadingBlock } from "./../components/Loading"
import {
  Post as PostDiv,
  PostEdit,
  PostNav,
  PostTime,
} from "./../components/Post"
import {
  SimpleError,
  MinimalisticError,
} from "./../components/Errors"
import "./Post.css"

export default class Post extends Component {
  static contextType = AppContext

  constructor(props) {
    super(props)
    if (props.match.params.id.length !== 24) {
      this.props.history.push("/page-was-not-found/error404")
    }
    this.state = {
      title: "",
      content: "",
      editTitle: "",
      editContent: "",
      creationTime: 0,
      lastEdited: 0,
      postId: props.match.params.id,
      isFetchingPostError: false,
      error: "",
      isLoading: true,
      isEditMode: queryString.parse(this.props.location.search).edit,
    }
  }

  cancelHandler = () => {
    this.setState(prevState => ({
      editTitle: prevState.title,
      editContent: prevState.content,
    }))
    this.props.history.push(this.props.match.url)
  }

  updatePostHandler = async () => {
    const editTitle = this.state.editTitle.trim()
    const editContent = this.state.editContent.trim()
    const isTitleChanged = this.state.title !== editTitle
    const isContentChanged = this.state.content !== editContent

    if (!isTitleChanged && !isContentChanged) {
      this.props.history.push(this.props.match.url)
      return
    }

    const validateError = validatePost(editTitle, editContent)
    if (validateError !== "") {
      this.setState({ error: validateError })
      return
    }

    const error = await updatePost({
      id: this.state.postId,
      title: editTitle,
      content: editContent,
    })
    if (error !== "") {
      console.error(error)
      this.setState({ error })
      return
    }
    this.props.history.push(this.props.match.url)
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  async componentDidMount() {
    if (this.props.location.data) {
      const {
        title,
        content,
        creation_time,
        last_edited,
      } = this.props.location.data
      this.setState({
        title,
        content,
        editTitle: title,
        editContent: content,
        creationTime: creation_time,
        lastEdited: last_edited,
      })
    } else {
      const resp = await fetchPost(this.state.postId)
      if (resp.error !== "") {
        console.error(resp.error)
        this.setState({ isFetchingPostError: true })
      } else {
        const {
          title,
          content,
          creation_time,
          last_edited,
        } = resp.body
        this.setState({
          title,
          content,
          editTitle: title,
          editContent: content,
          creationTime: creation_time,
          lastEdited: last_edited,
        })
      }
    }
    this.setState({ isLoading: false })
  }

  componentDidUpdate() {
    if (!this.context.isAuthorized) {
      return
    }
    const values = queryString.parse(this.props.location.search)
    if (!this.state.isEditMode && values.edit) {
      this.setState({ isEditMode: true, error: "" })
    } else if (this.state.isEditMode && !values.edit) {
      this.setState({ isEditMode: false, error: "" })
    }
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingBlock />
    }

    if (this.state.isFetchingPostError) {
      return <MinimalisticError content="Post doesn't exist." />
    }
    return (
      <div id="post-wrapper" className="row">
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="col s12">
            <PostNav history={this.props.history}>
              {this.context.isAuthorized &&
                (this.state.isEditMode ? (
                  <Fragment>
                    <button
                      className="btn nav-btn green"
                      onClick={this.cancelHandler}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn nav-btn blue"
                      onClick={this.updatePostHandler}
                    >
                      Update
                    </button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Link
                      className="btn nav-btn red darken-3"
                      to={{
                        pathname: `${this.props.match.url}/delete`,
                        data: {
                          title: this.state.title,
                          content: this.state.content,
                          creation_time: this.state.creationTime,
                          last_edited: this.state.lastEdited,
                        },
                      }}
                    >
                      Delete
                    </Link>
                    <Link
                      className="btn nav-btn orange darken-3"
                      to={`${this.props.match.url}?edit=true`}
                    >
                      Edit
                    </Link>
                  </Fragment>
                ))}
            </PostNav>
          </div>
          <div className="col s12">
            {this.state.error && (
              <SimpleError error={this.state.error} />
            )}
          </div>

          <div className="col s12">
            {this.context.isAuthorized && this.state.isEditMode ? (
              <PostEdit
                title={this.state.editTitle}
                content={this.state.editContent}
                inputChangeHandler={this.inputChangeHandler}
              />
            ) : (
              <PostDiv
                title={this.state.title || "***"}
                content={this.state.content}
              />
            )}
          </div>
          <div className="col s12">
            <PostTime
              creationTime={this.state.creationTime}
              lastEdited={this.state.lastEdited}
            />
          </div>
        </div>
      </div>
    )
  }
}
