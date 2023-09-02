import { useState } from "react";
import axios from 'axios';

const baseUrl = "https://todolist-api.hexschool.io";
function SignUp() {
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    nickname: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const signUp = async() => {
    try {
      const res = await axios.post(`${baseUrl}/users/sign_up`, form);
      setMessage(`註冊成功! Uid: ${res.data.uid}`);
      setForm({email: "", password: "", nickname: ""});
    } catch (err) {
      setMessage(`註冊失敗: ${err.response.data.message}`);
    }
  }

  return (
  <div>
    <h3>註冊</h3>
    <label htmlFor="email">Email</label>
    <input type="text" id="email" name="email" placeholder="請輸入 email" onChange={handleChange} required />

    <label htmlFor="password">密碼</label>
    <input type="password" name="password" id="password" placeholder="請輸入密碼" onChange={handleChange} required />

    <label htmlFor="nickname">暱稱</label>
    <input type="text" name="nickname" id="nickname" placeholder="請輸入您的暱稱" onChange={handleChange} required />

    <button type="button" onClick={signUp}>註冊帳號</button>
    <p>{message}</p>
    <hr></hr>
  </div>
  )
}

export default SignUp
