import { useState } from "react";
import axios from 'axios';

const baseUrl = "https://todolist-api.hexschool.io";
function CheckOut() {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setToken(e.target.value);
  }

  const verify = async() => {
    try {
      const res = await axios.get(`${baseUrl}/users/checkout`, {
        headers: {
          Authorization: token
        }
      });

      console.log(res);
      setMessage("驗證成功!");
    } catch (err) {
      setMessage(`驗證失敗: ${err.response.data.message}`);
    }
  }

  return (
  <div>
    <h3>檢查 Token  是否有效</h3>
    <label htmlFor="token">Token</label>
    <input type="text" id="token" name="token" value={token} onChange={handleChange} placeholder="請輸入 token" />

    <button type="button" onClick={verify}>驗證</button>
    <p>{message}</p>
    <hr></hr>
  </div>
  )
}

export default CheckOut
