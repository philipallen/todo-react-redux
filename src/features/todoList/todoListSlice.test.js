import todoListReducer, {
  initialState,
  addItem,
  deleteItem,
  toggleItemStatus,
  toggleAllItemsStatuses,
  selectCountOfIncompleteItems,
  selectAreAllItemsComplete,
} from "./todoListSlice";

describe("addItem", () => {
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
      newState = todoListReducer(initialState, addItem(newItem));
    });

    it("should return one item in the todo list", () => {
      expect(newState.items?.length).toBe(1);
    });

    it("should return the new item in the list", () => {
      expect(newState.items[0].title).toBe(newItem);
    });

    it("should make sure the new item is not set to complete", () => {
      expect(newState.items[0].isComplete).toBe(false);
    });
  });

  describe("when there is one item", () => {
    let stateWithItems;
    let newState;
    let itemIdToDelete;

    beforeEach(() => {
      itemIdToDelete = 1;
      stateWithItems = {
        items: [{ id: itemIdToDelete, title: "Clean car", isComplete: false }],
      };
      newState = todoListReducer(stateWithItems, deleteItem(itemIdToDelete));
    });

    describe("when you mark the item as complete", () => {
      beforeEach(() => {
        newState = todoListReducer(
          stateWithItems,
          toggleItemStatus({ isChecked: true, itemId: itemIdToDelete })
        );
      });

      it("should set it as complete in the store", () => {
        expect(newState.items[0].isComplete).toBe(true);
      });
    });

    describe("when you delete the item", () => {
      beforeEach(() => {
        newState = todoListReducer(stateWithItems, deleteItem(itemIdToDelete));
      });

      it("should return an empty list", () => {
        expect(newState.items?.length).toBe(0);
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
        items: [
          { id: itemIdToDelete, title: "Clean car", isComplete: false },
          { id: itemIdToRemain, title: "Eat", isComplete: false },
        ],
      };
      newState = todoListReducer(stateWithItems, deleteItem(itemIdToDelete));
    });

    describe("when you toggle all of them as complete", () => {
      beforeEach(() => {
        newState = todoListReducer(
          stateWithItems,
          toggleAllItemsStatuses(true)
        );
      });

      it("should set them as complete in the store", () => {
        expect(newState.items[0].isComplete).toBe(true);
        expect(newState.items[1].isComplete).toBe(true);
      });
    });

    describe("when you toggle all of them as todo", () => {
      beforeEach(() => {
        newState = todoListReducer(
          stateWithItems,
          toggleAllItemsStatuses(false)
        );
      });

      it("should set them as todo in the store", () => {
        expect(newState.items[0].isComplete).toBe(false);
        expect(newState.items[1].isComplete).toBe(false);
      });
    });

    describe("when you mark the second item as complete", () => {
      beforeEach(() => {
        newState = todoListReducer(
          stateWithItems,
          toggleItemStatus({ isChecked: true, itemId: itemIdToRemain })
        );
      });

      it("should set it as complete in the store", () => {
        expect(newState.items[1].isComplete).toBe(true);
      });
    });

    describe("when you delete an item", () => {
      beforeEach(() => {
        newState = todoListReducer(stateWithItems, deleteItem(itemIdToDelete));
      });

      it("should return list, minus the one you deleted", () => {
        expect(newState.items?.length).toBe(1);
      });

      it("should return the item which was to remain", () => {
        expect(newState.items[0].id).toBe(itemIdToRemain);
      });
    });
  });
});

describe("selectCountOfIncompleteItems tests", () => {
  it("should return 0 if there are no items", () => {
    const state = { todoList: { items: [] } };
    expect(selectCountOfIncompleteItems(state)).toBe(0);
  });

  it("should return 0 if all items are complete", () => {
    const state = {
      todoList: { items: [{ isComplete: true }, { isComplete: true }] },
    };
    expect(selectCountOfIncompleteItems(state)).toBe(0);
  });

  it("should return the correct count of incomplete items", () => {
    const state = {
      todoList: { items: [{ isComplete: false }, { isComplete: true }] },
    };
    expect(selectCountOfIncompleteItems(state)).toBe(1);
  });
});

describe("selectAreAllItemsComplete tests", () => {
  it("should return false if there are no items", () => {
    const state = {
      todoList: { items: [] },
    };
    expect(selectAreAllItemsComplete(state)).toBe(false);
  });

  it("should true if all items are complete", () => {
    const state = {
      todoList: { items: [{ isComplete: true }, { isComplete: true }] },
    };
    expect(selectAreAllItemsComplete(state)).toBe(true);
  });

  it("should return false if there is at least one false item", () => {
    const state = {
      todoList: { items: [{ isComplete: false }, { isComplete: true }] },
    };
    expect(selectAreAllItemsComplete(state)).toBe(false);
  });
});
