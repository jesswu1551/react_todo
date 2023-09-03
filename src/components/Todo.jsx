import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = "https://todolist-api.hexschool.io";
function Todo() {
  const navigate = useNavigate();
  const navItems = ["全部", "待完成", "已完成"];
  const [nickname, setNickname] = useState("");
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [currStatus, setCurrStatus]= useState("全部");
  const [currTodos, setCurrTodos] = useState([]);
  // const filterTodos = todos.filter(todo => currStatus === "待完成" ? !todo.status : (currStatus === "已完成" ? todo.status : todo));

  useEffect(() => {
    const token = document.cookie.split('; ').find((row) => row.startsWith('todo='))?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = token;
    checkOut();
    getTodoList();
  }, []);

  useEffect(() => {
    const newTodos = todos.filter(todo => currStatus === "待完成" ? !todo.status : (currStatus === "已完成" ? todo.status : todo));
      console.log(newTodos);
      setCurrTodos(newTodos);
  }, [currStatus]);

  const checkOut = async() => {
    try {
      const res = await axios.get(`${baseUrl}/users/checkout`);
      setNickname(res.data.nickname);
    } catch (err) {
      Swal.fire({
        title: '驗證失效',
        text: "請重新登入",
        icon: 'error',
        showConfirmButton: false,
        timer: 1000
      }).then(() => { navigate('/'); });
      console.log("checkout error: ", err);
    }
  }

  const getTodoList = async() => {
    try {
      const res = await axios.get(`${baseUrl}/todos`);
      setTodos(res.data.data);

      const newTodos = res.data.data.filter(todo => currStatus === "待完成" ? !todo.status : (currStatus === "已完成" ? todo.status : todo));
      console.log(newTodos);
      setCurrTodos(newTodos);
    } catch (err) {
      Swal.fire({
        title: '取得待辦事項失敗',
        text: err.response.data.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 1000
      });
    }
  }

  const addTodo = async() => {
    const todo = { content: newTodo };
    try {
      await axios.post(`${baseUrl}/todos`, todo);
      setNewTodo("");
      getTodoList();
    } catch (err) {
      console.log("add error: ", err);
    }
  }

  const deleteTodo = async(id) => {
    try {
      await axios.delete(`${baseUrl}/todos/${id}`);

      getTodoList();
    } catch (err) {
      console.log("delete error: ", err);
    }
  }

  const toggleStatus = async(id) => {
    try {
      await axios.patch(`${baseUrl}/todos/${id}/toggle`, {});

      getTodoList();
    } catch (err) {
      console.log("toggle status error: ", err);
    }
  }

  const handleLogout = async() => {
    try {
      await axios.post(`${baseUrl}/users/sign_out`, {});
      Swal.fire({
        title: '登出成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
      }).then(() => { navigate('/'); });
    } catch (err) {
      Swal.fire({
        title: '登出失敗',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000
      });
    }
  }

  const clearTodo = async() => {
    const deleteTodos = todos.filter(todo => todo.status);
    if (deleteTodos.length === 0) { return; }

    try {
      const swalRes = await Swal.fire({
        title: '確定清除已完成項目?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '是',
        cancelButtonText: '否'
      });

      if (!swalRes.isConfirmed) { return; }
      for (let i = 0; i < deleteTodos.length; i++) {
        await axios.delete(`${baseUrl}/todos/${deleteTodos[i].id}`);
      }
      Swal.fire({
        title: '清除項目成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
      }).then(() => { getTodoList(); });
    } catch (err) {
      Swal.fire({
        title: '刪除項目失敗',
        text: err.response.data.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 1000
      });
    }
  }

  return (<>
    <div id="todoListPage" className="bg-half">
      <nav>
        <a href="#"><img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt="logoImg" /></a>
        {/* <h1>
          <a href="#">ONLINE TODO LIST</a>
        </h1> */}
        <ul>
          <li className="todo_sm"><a><span>{nickname}的代辦</span></a></li>
          <li><a onClick={handleLogout}>登出</a></li>
        </ul>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <input type="text" value={newTodo} placeholder="新增待辦事項"
                   onChange={(e) => { setNewTodo(e.target.value); }}
                   onKeyDown={(e) => { if (e.key === "Enter") { addTodo(); } }} />
              <a href="#" onClick={() => addTodo()}><i className="fa fa-plus"></i></a>
          </div>
          {
            todos.length ? (
              <div className="todoList_list">
                <ul className="todoList_tab">
                  {
                    navItems.map(navItem => (
                      <li key={navItem}>
                        <a className={currStatus === navItem ? "active" : ""} onClick={(e) => { setCurrStatus(e.target.text); }}>{navItem}</a>
                      </li>
                    ))
                  }
                </ul>
                <div className="todoList_items">
                  <ul className="todoList_item">
                    {
                      currTodos.map(todo => {
                        return (
                          <li key={todo.id}>
                            <label className="todoList_label">
                              <input className="todoList_input" type="checkbox"
                                     value={todo.status} checked={todo.status}
                                     onChange={() => toggleStatus(todo.id)} />
                              <span>{todo.content}</span>
                            </label>
                            <a onClick={() => deleteTodo(todo.id)}>
                              <i className="fa fa-times"></i>
                            </a>
                          </li>)
                      })
                    }
                  </ul>
                  <div className="todoList_statistics">
                    <p> {todos.filter(todo => !todo.status).length} 個待完成項目</p>
                    <a onClick={clearTodo}>清除已完成項目</a>
                  </div>
                </div>
              </div>) : (<div style={{textAlign: "center", margin: "60px 0"}}>目前尚無待辦事項</div>)
          }
        </div>
      </div>
    </div>
  </>)
}

export default Todo
