import React from "react"
import { useState } from "react"
import { SignUp } from "./components/SignUpForm"
import { Authenticate } from "./components/Authenticate"


function App() {
  const [token, setToken] = useState(null)
  return (
    <>
      <SignUp token={token} setToken={setToken} />
      <Authenticate token={token} setToken={setToken} />
    </>
  )
}

export default App
