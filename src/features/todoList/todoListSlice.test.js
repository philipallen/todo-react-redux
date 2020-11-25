import todoListReducer, {
  initialState,
  addTodoItem,
  deleteTodoItem,
  completeTodoItem,
} from "./todoListSlice";

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

  describe("when there is one item", () => {
    let stateWithItems;
    let newState;
    let itemIdToDelete;

    beforeEach(() => {
      itemIdToDelete = 1;
      stateWithItems = {
        todoItems: [
          { id: itemIdToDelete, title: "Clean car", isComplete: false },
        ],
      };
      newState = todoListReducer(
        stateWithItems,
        deleteTodoItem(itemIdToDelete)
      );
    });

    describe("when you mark the item as complete", () => {
      beforeEach(() => {
        newState = todoListReducer(
          stateWithItems,
          completeTodoItem({ isChecked: true, itemId: itemIdToDelete })
        );
      });

      it("should set it as complete in the store", () => {
        expect(newState.todoItems[0].isComplete).toBe(true);
      });
    });

    describe("when you delete the item", () => {
      beforeEach(() => {
        newState = todoListReducer(
          stateWithItems,
          deleteTodoItem(itemIdToDelete)
        );
      });

      it("should return an empty list", () => {
        expect(newState.todoItems?.length).toBe(0);
      });
    });
  });

  describe("when there are two items", () => {
    let stateWithItems;
    let newState;
    let itemIdToDelete;
    let itemIdToRemain;

    beforeEach(() => {
      itemIdToDelete = 1;
      itemIdToRemain = 2;
      stateWithItems = {
        todoItems: [
          { id: itemIdToDelete, title: "Clean car", isComplete: false },
          { id: itemIdToRemain, title: "Eat", isComplete: false },
        ],
      };
      newState = todoListReducer(
        stateWithItems,
        deleteTodoItem(itemIdToDelete)
      );
    });

    describe("when you mark the second item as complete", () => {
      beforeEach(() => {
        newState = todoListReducer(
          stateWithItems,
          completeTodoItem({ isChecked: true, itemId: itemIdToRemain })
        );
      });

      it("should set it as complete in the store", () => {
        expect(newState.todoItems[1].isComplete).toBe(true);
      });
    });

    describe("when you delete an item", () => {
      beforeEach(() => {
        newState = todoListReducer(
          stateWithItems,
          deleteTodoItem(itemIdToDelete)
        );
      });

      it("should return list, minus the one you deleted", () => {
        expect(newState.todoItems?.length).toBe(1);
      });

      it("should return the item which was to remain", () => {
        expect(newState.todoItems[0].id).toBe(itemIdToRemain);
      });
    });
  });
});
