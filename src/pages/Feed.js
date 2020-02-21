import React, { Component, Fragment } from "react"

import { fetchPosts } from "./../utils/crud"
import { AppContext } from "../utils/helpers"

import { LoadingBlock } from "./../components/Loading"
import { MinimalisticError } from "./../components/Errors"
import FeedNav from "./../components/FeedNav"
import CreatePost from "./../components/CreatePost"
import Posts from "./../components/Posts"

import "./Feed.css"

export default class Feed extends Component {
  static contextType = AppContext

  state = {
    isLoading: true,
    isError: false,
    posts: {},
    pageNum: 1,
  }

  setPosts(key, data) {
    this.setState(prevState => ({
      posts: { ...prevState.posts, [key]: data },
    }))
  }

  appendPostHandler = newPost => {
    this.setState(prevState => {
      if (prevState.posts[1]) {
        prevState.posts[1].unshift(newPost)
      } else {
        prevState.posts = { 1: [newPost] }
      }
      return { posts: prevState.posts }
    })
  }

  static getDerivedStateFromProps(props, state) {
    const urlParam = parseInt(props.match.params.id)
    if (urlParam && state.pageNum !== urlParam) {
      return { pageNum: urlParam }
    }
    return null
  }

  async getPosts() {
    const resp = await fetchPosts(this.state.pageNum)
    if (resp.error !== "") {
      console.error(resp.error)
      this.setState({ isError: true })
    } else {
      this.setPosts(this.state.pageNum, resp.body)
    }
    this.setState({ isLoading: false })
  }

  componentDidMount() {
    this.getPosts()
  }

  componentDidUpdate(prevProps, prevState) {
    const isPresentInPosts = this.state.pageNum in this.state.posts
    if (
      prevState.pageNum !== this.state.pageNum &&
      !isPresentInPosts
    ) {
      this.getPosts()
    } else if (isPresentInPosts && this.state.isError) {
      this.setState({ isError: false })
    }
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingBlock />
    }

    return (
      <Fragment>
        {this.context.isAuthorized && this.state.pageNum === 1 && (
          <CreatePost appendPostHandler={this.appendPostHandler} />
        )}
        {this.state.isError ? (
          <MinimalisticError content="My thoughts weren't loaded." />
        ) : (
          <Fragment>
            <Posts
              posts={this.state.posts[this.state.pageNum] || []}
              history={this.props.history}
            />
            <FeedNav currentPageNum={this.state.pageNum} />
          </Fragment>
        )}
      </Fragment>
    )
  }
}
