import SignUp from "./SignUp"
import SignIn from "./SignIn"
import CheckOut from "./CheckOut"
import SignOut from "./SignOut"
import Todo from "./Todo"
import { useState } from "react"

function Form() {
  const [token, setToken] = useState("");

  return (
    <>
      <SignUp />
      <SignIn setToken={setToken} />
      <CheckOut />
      <SignOut token={token} setToken={setToken} />

      <h3>Todo List</h3>
      {
        !token ? "請先登入" : <Todo token={token} />
      }
    </>
  )
}

export default Form
