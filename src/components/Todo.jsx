import { useEffect, useState } from "react";
import axios from 'axios';

const baseUrl = "https://todolist-api.hexschool.io";
function Todo({token}) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState({});

  useEffect(() => {
    if (token) {
      getTodoList();
    }
  }, [token]);

  const getTodoList = async() => {
    try {
      const res = await axios.get(`${baseUrl}/todos`, {
        headers: {
          Authorization: token
        }
      });

      setTodos(res.data.data);
    } catch (err) {
      console.log("get todo error: ", err);
    }
  }

  const setEdit = (id, value) => {
    const newEditTodos = { ...editTodo };
    newEditTodos[id] = value;
    setEditTodo(newEditTodos);
  }

  const addTodo = async() => {
    const todo = { content: newTodo };

    try {
      await axios.post(`${baseUrl}/todos`, todo, {
        headers: {
          Authorization: token
        }
      });

      setNewTodo("");
      getTodoList();
    } catch (err) {
      console.log("add error: ", err);
    }
  }

  const updateTodo = async(id) => {
    const todo = todos.find(todo => todo.id === id);
    todo.content = editTodo[id];

    try {
      await axios.put(`${baseUrl}/todos/${id}`, todo, {
        headers: {
          Authorization: token
        }
      });

      getTodoList();
    } catch (err) {
      console.log("update error: ", err);
    }
  }

  const deleteTodo = async(id) => {
    try {
      await axios.delete(`${baseUrl}/todos/${id}`, {
        headers: {
          Authorization: token
        }
      });

      getTodoList();
    } catch (err) {
      console.log("delete error: ", err);
    }
  }

  const toggleStatus = async(id) => {
    try {
      await axios.patch(`${baseUrl}/todos/${id}/toggle`, {}, {
        headers: {
          Authorization: token
        }
      });

      getTodoList();
    } catch (err) {
      console.log("toggle status error: ", err);
    }
  }

  return (<>
    <div>
      <label htmlFor="newTodo">Add New</label>
      <input type="text" id="newTodo" value={newTodo} onChange={(e) => { setNewTodo(e.target.value); }} placeholder="請輸入待辦事項" />
      <button onClick={() => addTodo()}>新增</button>
    </div>

    <ul>
        {
          todos.map(todo => {
            return (
              <>
                <li key={todo.id}><span>{todo.content}</span> | <span>{todo.status ? "完成" : "未完成"}</span>
                  <input type="text" onChange={(e) => { setEdit(todo.id, e.target.value); }} placeholder="更新值" />
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  <button onClick={() => updateTodo(todo.id)}>Update</button>
                  <button onClick={() => toggleStatus(todo.id)}>Toggle Status</button>
                </li>
              </>)
          })
        }
    </ul>
  </>)
}

export default Todo
