import { BehaviorSubject } from "rxjs"
import { isUserAuthorized } from "./crud"

class Auth {
  constructor() {
    this.authSubject = new BehaviorSubject(false)
    this.authorizationCheck()
  }

  get isAuthorized() {
    return this.authSubject.getValue()
  }

  get stateChange() {
    return this.authSubject.asObservable()
  }

  set authStatus(status) {
    if (status === this.isAuthorized) {
      return
    }
    this.authSubject.next(status)
  }

  authorizationCheck = async () => {
    this.authStatus = await isUserAuthorized()
  }
}

export default new Auth()
