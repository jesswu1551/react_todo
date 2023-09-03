import { HashRouter, Route, Routes } from 'react-router-dom';
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import Todo from "./Todo"

function Form() {

  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/todo" element={<Todo />}></Route>
      </Routes>
    </HashRouter>
    </>
  )
}

export default Form
