import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "../features/todoList/todoListSlice";

export default configureStore({
  reducer: {
    todoList: todoListReducer,
  },
});
