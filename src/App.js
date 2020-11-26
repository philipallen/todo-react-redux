import React from "react";
import { useDispatch } from "react-redux";
import { TodoList } from "./features/todoList/TodoList";
import { populateStoreFromLocalStorage } from "../src/features/todoList/todoListSlice";

function App() {
  const dispatch = useDispatch();

  // First thing the app does is grab the local storage and then saves it in the store
  const todoList = JSON.parse(localStorage.getItem("todoList"));

  if (todoList) {
    dispatch(populateStoreFromLocalStorage(todoList));
  }

  return <TodoList />;
}

export default App;
