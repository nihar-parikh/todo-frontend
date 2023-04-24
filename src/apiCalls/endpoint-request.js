import axios from "axios";
import { BASE_URL } from "./constants";

export const getAllToDos = async (setTodos, setLoader) => {
  setLoader(true);
  try {
    const { data } = await axios.get(`${BASE_URL}/all`);
    setTodos(data.data);
    setLoader(false);
  } catch (error) {
    setLoader(false);
    alert(error);
  }
};

export const createToDo = async ({ title, todos, setTodos, setLoader }) => {
  setLoader(true);
  try {
    const { data } = await axios.post(`${BASE_URL}/create`, {
      title,
    });
    if (data.data !== undefined) {
      if (data.data.error) {
        setLoader(false);
        return alert(data.message);
      }
      const newTodos = [data.data, ...todos];
      setTodos(newTodos);
      setLoader(false);
    } else {
      setLoader(false);
      return alert(data.errors[0].msg);
    }
  } catch (error) {
    setLoader(false);
    alert(error);
  }
};

export const editToDo = async ({ todoId, newValue, setTodos, setLoader }) => {
  setLoader(true);
  try {
    const { data } = await axios.put(`${BASE_URL}`, {
      id: todoId,
      title: newValue.title,
    });
    if (data) {
      setTodos((prev) =>
        prev.map((item) => (item._id === todoId ? data.data : item))
      );
      setLoader(false);
    }
  } catch (error) {
    setLoader(false);
    alert(error);
  }
};

export const deleteToDo = async (id, todos, setTodos, setLoader) => {
  setLoader(true);
  try {
    const { data } = await axios.delete(`${BASE_URL}`, {
      data: { id },
    });
    if (data.message === "To Do deleted.") {
      const removedArr = [...todos].filter((todo) => todo._id !== id);
      setTodos(removedArr);
      setLoader(false);
    }
  } catch (error) {
    setLoader(false);
    alert(error);
  }
};

export const updateToDoStatus = async ({
  toDo,
  todos,
  setTodos,
  setLoader,
}) => {
  setLoader(true);
  try {
    const { data } = await axios.put(`${BASE_URL}/status-update`, {
      id: toDo._id,
      isComplete: !toDo.isComplete,
    });
    if (data) {
      let updatedTodos = todos.map((todo) => {
        if (todo._id === toDo._id) {
          todo.isComplete = !todo.isComplete;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setLoader(false);
    }
  } catch (error) {
    setLoader(false);
    alert(error);
  }
};
