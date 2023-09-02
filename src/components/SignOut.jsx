import { useState } from "react";
import axios from 'axios';

const baseUrl = "https://todolist-api.hexschool.io";
function SignOut({token, setToken}) {
  const [message, setMessage] = useState("");

  const signOut = async() => {
    try {
      console.log(token);
      const res = await axios.post(`${baseUrl}/users/sign_out`, {}, {
        headers: {
          Authorization: token
        }
      });
      console.log(res);
      setMessage("登出成功!");
      setToken("");
    } catch (err) {
      setMessage(`登出失敗: ${err.response.data.message}`);
    }
  }

  return (
  <div>
    <h3>登出</h3>
    <button type="button" onClick={signOut}>登出</button>
    <p>{message}</p>
    <hr></hr>
  </div>
  )
}

export default SignOut
