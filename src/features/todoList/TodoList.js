import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTodoItems, addTodoItem } from "./todoListSlice";
import * as S from "./TodoList.styled";

export function TodoList() {
  const todoItems = useSelector(selectTodoItems);
  const [todoInputValue, setTodoInputValue] = useState("");
  const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState("2");

  const handleTodoInputChange = (e) => setTodoInputValue(e?.target?.value);

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
        <S.TodoItem key={i}>{todoItem.title}</S.TodoItem>
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
