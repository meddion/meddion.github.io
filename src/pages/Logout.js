import auth from "./../utils/auth"
import { logoutUser } from "./../utils/crud"

import newQAComponent from "./../components/newQAComponent"

export default newQAComponent("Do you want to logout?", async props => {
  const error = await logoutUser()
  if (error !== "") {
    throw new Error(error)
  }
  auth.authStatus = false
  props.history.push("/1")
})
