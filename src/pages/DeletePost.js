import { deletePost } from "./../utils/crud"

import newQAComponent from "./../components/newQAComponent"

export default newQAComponent(
  "Are you sure you wanna delete this post?",
  async props => {
    const error = await deletePost(props.match.params.id)
    if (error !== "") {
      throw new Error(error)
    }
    props.history.goBack()
  },
)
