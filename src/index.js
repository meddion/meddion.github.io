import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import axios from "axios"
import "materialize-css"
import "./index.css"
import App from "./components/App"

// We enable to send cookies with a request

axios.defaults.withCredentials = true

ReactDOM.render(<App />, document.getElementById("root"))

serviceWorker.unregister()
