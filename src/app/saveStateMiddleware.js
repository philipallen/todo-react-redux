export const saveStateMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // This middleware is simply grabbing the latest store and setting it in local storage
  // It runs after every change to the store
  const todoList = store.getState()?.todoList;
  localStorage.setItem("todoList", JSON.stringify(todoList));

  return result;
};
