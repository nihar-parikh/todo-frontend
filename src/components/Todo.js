import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    _id: null,
    title: "",
  });

  const submitUpdate = (value) => {
    console.log({ value });
    updateTodo(edit._id, value);
    setEdit({
      _id: null,
      title: "",
    });
  };

  if (edit._id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo._id} onClick={() => completeTodo(todo)}>
        {todo.title}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo._id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ _id: todo._id, title: todo.title })}
          className="edit-icon"
        />
      </div>
    </div>
  ));
};

export default Todo;
