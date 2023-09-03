import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";

const baseUrl = "https://todolist-api.hexschool.io";
function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      confirmpassword: ""
    },
    mode: 'onTouched'
  });

  const signUp = async(data) => {
    try {
      await axios.post(`${baseUrl}/users/sign_up`, data);
      Swal.fire({
        title: '註冊成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
      }).then(() => { navigate('/'); });
    } catch (err) {
      Swal.fire({
        title: '註冊失敗',
        text: err.response.data.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 1000
      });
    }
  }

  return (
    <div id="signUpPage" className="bg-yellow">
        <div className="conatiner signUpPage vhContainer">
            <div className="side">
                <a href="#"><img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="logoImg" /></a>
                <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg" />
            </div>
            <div>
                <form className="formControls" onSubmit={handleSubmit(signUp)}>
                    <h2 className="formControls_txt">註冊帳號</h2>

                    <label className="formControls_label" htmlFor="email">Email</label>
                    <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email"
                           {...register('email', {required: {value: true, message: '信箱必填'}, pattern: {value: /^\S+@\S+$/i, message: '信箱格式錯誤'}})} />
                    <span>{errors.email && errors.email.message}</span>

                    <label className="formControls_label" htmlFor="nickname">您的暱稱</label>
                    <input className="formControls_input" type="text" name="nickname" id="nickname" placeholder="請輸入您的暱稱"
                           {...register('nickname',{required: {value: true, message: '暱稱必填'}})} />
                    <span>{errors.nickname && errors.nickname.message}</span>

                    <label className="formControls_label" htmlFor="password">密碼</label>
                    <input className="formControls_input" type="password" name="password" id="password" placeholder="請輸入密碼"
                           {...register('password', {required: {value: true, message: '密碼必填'}, minLength: {value: 6, message: '密碼不可低於 6 個字元'}})} />
                    <span>{errors.password && errors.password.message}</span>

                    <label className="formControls_label" htmlFor="confirmpassword">再次輸入密碼</label>
                    <input className="formControls_input" type="password" name="confirmpassword" id="confirmpassword" placeholder="請再次輸入密碼"
                          {...register('confirmpassword', {required: {value: true, message: '確認密碼必填'}, minLength: {value: 6, message: '確認密碼不可低於 6 個字元'}})} />
                    <span>{errors.confirmpassword && errors.confirmpassword.message}</span>

                    <input className="formControls_btnSubmit" type="submit" value="註冊帳號" />
                    <NavLink to="/" className="formControls_btnLink"><p>登入</p></NavLink>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUp