import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTodoItems,
  addTodoItem,
  deleteTodoItem,
  completeTodoItem,
} from "./todoListSlice";
import * as S from "./TodoList.styled";

export function TodoList() {
  const todoItems = useSelector(selectTodoItems);
  const [todoInputValue, setTodoInputValue] = useState("");
  const dispatch = useDispatch();

  const handleTodoInputChange = (e) => setTodoInputValue(e?.target?.value);

  const handleStatusChange = (e, itemId) =>
    dispatch(completeTodoItem({ isChecked: e?.target?.checked, itemId }));

  return (
    <div>
      <S.TodoInput
        value={todoInputValue}
        onChange={handleTodoInputChange}
      ></S.TodoInput>
      <S.AddButton onClick={() => dispatch(addTodoItem(todoInputValue))}>
        Add
      </S.AddButton>
      {todoItems.map((todoItem, i) => (
        <div key={i}>
          <S.Status
            type="checkbox"
            onChange={(e) => handleStatusChange(e, todoItem.id)}
          ></S.Status>
          <S.TodoItem>{todoItem.title}</S.TodoItem>
          <S.DeleteButton onClick={() => dispatch(deleteTodoItem(todoItem.id))}>
            Delete
          </S.DeleteButton>
        </div>
      ))}

      {/* <div>
        <button
          aria-label="Increment value"
          // onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          aria-label="Decrement value"
          // onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div>
        <input
          aria-label="Set increment amount"
          // value={incrementAmount}
          // onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
        // onClick={() =>
        // dispatch(incrementByAmount(Number(incrementAmount) || 0))
        // }
        >
          Add Amount
        </button>
        <button
        // onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div> */}
    </div>
  );
}
