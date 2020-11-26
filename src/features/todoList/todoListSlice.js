import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  items: [],
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = {
        id: new Date().getTime(), // TODO swap this for uuid
        title: action?.payload,
        isComplete: false,
      };
      state?.items?.push(newItem);
    },
    deleteItem: (state, action) => {
      const itemId = action.payload;
      const items = state.items;
      items?.splice(
        items?.findIndex((i) => {
          return i.id === itemId;
        }),
        1
      );
    },
    toggleItemStatus: (state, action) => {
      const itemId = action.payload?.itemId;
      const items = state.items;
      items.forEach((item) => {
        if (item.id === itemId) {
          item.isComplete = action.payload?.isChecked;
        }
      });
    },
    toggleAllItemsStatuses: (state, action) => {
      const items = state.items;
      items.forEach((item) => {
        item.isComplete = action.payload;
      });
    },
    populateStoreFromLocalStorage: (state, action) => ({ ...action.payload }),
  },
});

export const {
  addItem,
  deleteItem,
  toggleItemStatus,
  toggleAllItemsStatuses,
  populateStoreFromLocalStorage,
} = todoListSlice.actions;

export const selectItems = (state) => state?.todoList?.items;

export const selectCountOfIncompleteItems = (state) => {
  const items = state?.todoList?.items;
  let countOfIncompleteItems = 0;
  items.forEach((item) => !item.isComplete && countOfIncompleteItems++);
  return countOfIncompleteItems;
};

export default todoListSlice.reducer;
