import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL

const isUserAuthorized = async () => {
  try {
    const resp = await axios.post(`${API_URL}account/login`)
    return resp.data.ok
  } catch (error) {}
  return false
}

const loginUser = async (name, password) => {
  try {
    const resp = await axios.post(`${API_URL}account/login`, {
      name,
      password,
    })
    if (!resp.data.ok) {
      return "The username and the password do not match."
    }
  } catch (error) {
    return "The internal server error has occurred."
  }
  return ""
}

const logoutUser = async () => {
  try {
    const resp = await axios.post(`${API_URL}account/logout`)
    if (!resp.data || !resp.data.ok) {
      throw new Error("Couldn't perform logout properly.")
    }
  } catch (error) {
    return error.message
  }
  return ""
}

const createPost = async newPost => {
  let resp
  try {
    resp = await axios.post(`${API_URL}post/`, newPost)
    if (!resp.data || !resp.data.ok) {
      throw new Error(
        "Couldn't create a new post, reason: " + resp.data.error,
      )
    }
  } catch (error) {
    return {
      body: null,
      error: error.message,
    }
  }
  return {
    body: resp.data.body,
    error: "",
  }
}

const updatePost = async updatedPost => {
  try {
    const resp = await axios.put(`${API_URL}post/`, updatedPost)
    if (!resp.data || !resp.data.ok) {
      return "Couldn't update the post, reason: " + resp.data.error
    }
  } catch (error) {
    return "Failed to update the post."
  }
  return ""
}

const deletePost = async postID => {
  try {
    const resp = await axios.delete(`${API_URL}post/${postID}`)
    if (!resp.data || !resp.data.ok) {
      return "Couldn't delete the post, reason: " + resp.data.error
    }
  } catch (error) {
    return error.message
  }
  return ""
}

const fetchPosts = async pageNum => {
  let resp
  try {
    resp = await axios.get(
      `${API_URL}posts/${pageNum}?sortByDate=asc`,
    )
    if (!resp.data.ok) throw new Error(resp.data.error)
  } catch (error) {
    return {
      body: null,
      error: error.message,
    }
  }
  return {
    body: resp.data.body,
    error: "",
  }
}

const fetchPost = async postId => {
  let resp
  try {
    resp = await axios.get(`${API_URL}post/${postId}`)
    if (!resp.data.ok) throw new Error("")
  } catch (error) {
    return {
      body: null,
      error: "Failed to fetch the post's content and title.",
    }
  }
  return {
    body: resp.data.body,
    error: "",
  }
}

const fetchPostsInfo = async () => {
  let resp
  try {
    resp = await axios.get(`${API_URL}posts/info`)
    if (!resp.data.ok) {
      throw new Error(resp.data.error)
    }
    if (
      !resp.data.body.postsPerPage ||
      !resp.data.body.totalNumOfPosts
    ) {
      throw new Error("on receiving a wrong data from the server")
    }
  } catch (error) {
    return {
      body: null,
      error: error.message,
    }
  }
  return {
    body: resp.data.body,
    error: "",
  }
}

export {
  isUserAuthorized,
  loginUser,
  logoutUser,
  createPost,
  updatePost,
  deletePost,
  fetchPost,
  fetchPosts,
  fetchPostsInfo,
}
