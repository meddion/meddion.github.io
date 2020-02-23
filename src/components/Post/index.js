import React from "react"
import { Link } from "react-router-dom"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import "./Post.css"

dayjs.extend(relativeTime)

const PostCard = ({ children }) => (
  <div id="post" className="card white-text grey darken-4 ">
    <div className="card-content">{children}</div>
  </div>
)

const Post = ({ title, content }) => {
  return (
    <PostCard>
      <span className="card-title center-align">
        <h5>{title}</h5>
      </span>
      <p>{content}</p>
    </PostCard>
  )
}

const PostEdit = ({ title, content, inputChangeHandler }) => {
  return (
    <PostCard>
      <span className="card-title center-align truncate">
        <textarea
          onChange={inputChangeHandler}
          value={title}
          placeholder="***"
          name="editTitle"
          id="title"
          className="materialize-textarea white-text center-align"
        />
      </span>
      <textarea
        onChange={inputChangeHandler}
        value={content}
        placeholder="..."
        name="editContent"
        id="content"
        type="text"
        className="materialize-textarea white-text"
      />
    </PostCard>
  )
}

const PostEditHeader = ({ post }) => (
  <div id="post-edit-header" className="right-align">
    <Link
      className="grey-text text-darken-2"
      to={`/post/${post.id}?edit=true`}
    >
      Edit
    </Link>
    <Link
      className="grey-text text-darken-1"
      to={{
        pathname: `/post/${post.id}/delete`,
        data: {
          title: post.title,
          content: post.content,
          creation_time: post.creation_time,
          last_edited: post.last_edited,
        },
      }}
    >
      Remove
    </Link>
  </div>
)

const PostTime = ({ creationTime, lastEdited }) => {
  creationTime = dayjs.unix(creationTime).fromNow()
  lastEdited =
    lastEdited !== 0 ? dayjs.unix(lastEdited).fromNow() : ""
  return (
    <div id="post-date" className="right-align grey-text">
      Posted {creationTime}
      {lastEdited === "" || creationTime === lastEdited || (
        <span> [changed {lastEdited}]</span>
      )}
    </div>
  )
}

const PostNav = ({ history, children }) => (
  <div className="row">
    <div className="col s6 left-align">
      <button className="btn grey darken-3" onClick={history.goBack}>
        <i className="material-icons left">arrow_back</i>Back
      </button>
    </div>
    <div className="col s6 right-align">{children}</div>
  </div>
)

export { Post, PostEdit, PostEditHeader, PostTime, PostNav }
