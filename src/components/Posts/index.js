import React from "react"
import { Link } from "react-router-dom"

import { AppContext } from "./../../utils/helpers"

import { Post, PostTime, PostEditHeader } from "./../Post"
import "./Posts.css"

export default function Posts({ posts }) {
  return (
    <div id="posts" className="row">
      {posts.map((post, i) => {
        let content = post.content
        if (content.length > 400) {
          content = content.substring(0, 400) + " ..."
        }
        let title = post.title
        if (title.length === 0) {
          title = "***"
        }
        return (
          <div key={i} className="col s12">
            <div className="row">
              <AppContext.Consumer>
                {({ isAuthorized }) =>
                  isAuthorized && (
                    <div className="col s12">
                      <PostEditHeader post={post} />
                    </div>
                  )
                }
              </AppContext.Consumer>
              <div className="col s12">
                <Link
                  className="post-hover"
                  to={{
                    pathname: `/post/${post.id}`,
                    data: {
                      title: post.title,
                      content: post.content,
                      creation_time: post.creation_time,
                      last_edited: post.last_edited,
                    },
                  }}
                >
                  <Post
                    hover={true}
                    title={post.title}
                    content={post.content}
                  />
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
