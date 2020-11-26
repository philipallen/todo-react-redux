import { configureStore } from "@reduxjs/toolkit";
import todoListReducer from "../features/todoList/todoListSlice";
import { saveStateMiddleware } from "./saveStateMiddleware";

export default configureStore({
  reducer: {
    todoList: todoListReducer,
  },
  middleware: [saveStateMiddleware],
});
