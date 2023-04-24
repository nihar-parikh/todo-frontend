import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import {
  createToDo,
  deleteToDo,
  editToDo,
  getAllToDos,
  updateToDoStatus,
} from "../apiCalls/endpoint-request";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getAllToDos(setTodos, setLoader);
  }, []);

  const addTodo = (todo) => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }
    const { title } = todo;
    createToDo({ title, todos, setTodos, setLoader });
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.title || /^\s*$/.test(newValue.title)) {
      return;
    }
    editToDo({ todoId, newValue, setTodos, setLoader });
  };

  const removeTodo = (id) => {
    deleteToDo(id, todos, setTodos, setLoader);
  };

  const completeTodo = (toDo) => {
    updateToDoStatus({ toDo, todos, setTodos, setLoader });
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      {loader && <div class="loader"></div>}
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
