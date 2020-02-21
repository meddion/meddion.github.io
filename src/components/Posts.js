import React from "react"
import { Link } from "react-router-dom"

import { AppContext } from "../utils/helpers"

import { Post, PostTime, PostEditHeader } from "./Post"

export default function Posts({ posts }) {
  return (
    <div className="row">
      {posts.map((post, i) => {
        if (post.content.length > 400) {
          post.content = post.content.substring(0, 400) + " ..."
        }
        if (post.title.length === 0) {
          post.title = "***"
        }
        return (
          <div key={i} className="row">
            <div className="col s8 offset-s2">
              <AppContext.Consumer>
                {({ isAuthorized }) =>
                  isAuthorized && (
                    <div className="col s12">
                      <PostEditHeader postID={post.id} />
                    </div>
                  )
                }
              </AppContext.Consumer>
              <div className="col s12">
                <Link to={`/post/${post.id}`}>
                  <Post title={post.title} content={post.content} />
                </Link>
              </div>
              <div className="col s12">
                <PostTime
                  creationTime={post.creation_time}
                  lastEdited={post.last_edited}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
