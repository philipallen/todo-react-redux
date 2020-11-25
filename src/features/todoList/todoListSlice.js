import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  todoItems: [],
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodoItem: (state, action) => {
      const newItem = {
        id: new Date().getTime(),
        title: action?.payload,
        isComplete: false,
      };
      state?.todoItems?.push(newItem);
    },
    deleteTodoItem: (state, action) => {
      const itemId = action.payload;
      const items = state.todoItems;
      items?.splice(
        items?.findIndex((i) => {
          return i.id === itemId;
        }),
        1
      );
      // TODO this might not work
    },
    completeTodoItem: (state, action) => {
      const itemId = action.payload;
      const items = state.todoItems;
      items.forEach((item) => {
        // TODO refactor this:
        if (item.id === itemId) {
          item.isComplete = true;
        }
      });
    },
  },
});

export const {
  addTodoItem,
  deleteTodoItem,
  completeTodoItem,
} = todoListSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  // setTimeout(() => {
  //   dispatch(incrementByAmount(amount));
  // }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.todoList.value)`
export const selectTodoItems = (state) => state?.todoList?.todoItems;

export default todoListSlice.reducer;
