import { useState } from "react";
import axios from 'axios';

const baseUrl = "https://todolist-api.hexschool.io";
function SignIn({setToken}) {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const signIn = async() => {
    try {
      const res = await axios.post(`${baseUrl}/users/sign_in`, form);
      setMessage(`登入成功! Token: ${res.data.token}`);
      setForm({email: "", password: ""});
      setToken(res.data.token);
    } catch (err) {
      setMessage(`登入失敗: ${err.response.data.message}`);
    }
  }

  return (
  <div>
    <h3>登入</h3>
    <label htmlFor="email">Email</label>
    <input type="text" id="email" name="email" placeholder="請輸入 email" onChange={handleChange} required />

    <label htmlFor="password">密碼</label>
    <input type="password" name="password" id="password" placeholder="請輸入密碼" onChange={handleChange} required />

    <button type="button" onClick={signIn}>登入</button>
    <p style={{"overflowWrap": "anywhere"}}>{message}</p>
    <hr></hr>
  </div>
  )
}

export default SignIn
