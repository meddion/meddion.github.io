import React, { Component } from "react"
import { Link } from "react-router-dom"

import { fetchPostsInfo } from "../../utils/crud"

import { LoadingBlock } from "../Loading"
import { MinimalisticError } from "../Errors"

import "./FeedNav.css"

export default class FeedNav extends Component {
  state = {
    isLoading: true,
    isError: false,
    postsPerPage: 0,
    totalNumOfPosts: 0,
  }

  async componentDidMount() {
    const resp = await fetchPostsInfo()
    if (resp.error !== "") {
      console.error(resp.error)
      this.setState({ isError: true })
    } else {
      const { postsPerPage, totalNumOfPosts } = resp.body
      this.setState({ postsPerPage, totalNumOfPosts })
    }
    this.setState({ isLoading: false })
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingBlock />
    }

    if (this.state.isError) {
      return (
        <MinimalisticError content="Navigation bar wasn't loaded." />
      )
    }

    const isNextDisabled =
      this.props.currentPageNum <
      Math.ceil(this.state.totalNumOfPosts / this.state.postsPerPage)
        ? ""
        : "disabled"
    const isPrevDisabled =
      this.props.currentPageNum > 1 ? "" : "disabled"
    const prev = this.props.currentPageNum - 1
    const next = this.props.currentPageNum + 1
    return (
      <div className="row text-white">
        <div id="buttons" className="col s12 m8 left-align">
          <Link
            to={`/${prev}`}
            className={`btn-small ${isPrevDisabled} blue navBtn`}
          >
            <i className="material-icons left">arrow_back</i>Prev
          </Link>
          <Link
            to={`/${next}`}
            className={`btn-small ${isNextDisabled} blue navBtn`}
          >
            <i className="material-icons right">arrow_forward</i>
            Next
          </Link>
        </div>
        <div
          id="page-counter"
          className="col s12 m4 right-align grey-text"
        >
          Page {this.props.currentPageNum}
        </div>
      </div>
    )
  }
}
