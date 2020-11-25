import todoListReducer, { initialState, addTodoItem } from "./todoListSlice";

describe("addTodoItem", () => {
  describe("when there are no items", () => {
    it("should return no todo items", () => {
      const newState = todoListReducer(initialState, {});
      expect(newState).toBe(initialState);
    });
  });

  describe("when you add an item", () => {
    let newItem;
    let newState;

    beforeEach(() => {
      newItem = "Buy milk";
      newState = todoListReducer(initialState, addTodoItem(newItem));
    });

    it("should return one item in the todo list", () => {
      expect(newState.todoItems?.length).toBe(1);
    });

    it("should return the new item in the list", () => {
      expect(newState.todoItems[0].title).toBe(newItem);
    });

    it("should make sure the new item is not set to complete", () => {
      expect(newState.todoItems[0].isComplete).toBe(false);
    });
  });
});
