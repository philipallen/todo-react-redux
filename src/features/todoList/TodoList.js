import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectItems,
  selectCountOfIncompleteItems,
  addItem,
  deleteItem,
  toggleItemStatus,
  toggleAllItemsStatuses,
} from "./todoListSlice";
import * as S from "./TodoList.styled";

export function TodoList() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const countOfIncompleteItems = useSelector(selectCountOfIncompleteItems);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => setInputValue(e?.target?.value);

  const handleAddButtonClick = () => {
    dispatch(addItem(inputValue));
    setInputValue("");
  };

  const handleStatusCheckboxChange = (e, itemId) =>
    dispatch(toggleItemStatus({ isChecked: e.target?.checked, itemId }));

  const handleMasterStatusCheckboxChange = (e) =>
    dispatch(toggleAllItemsStatuses(e.target?.checked));

  return (
    <div>
      <S.Input
        value={inputValue}
        onChange={handleInputChange}
        data-cy="todo-input"
      ></S.Input>
      {/* TODO split below out to separate component */}
      <S.AddButton onClick={handleAddButtonClick} data-cy="todo-add-btn">
        Add
      </S.AddButton>
      {items.map((item, i) => (
        <div key={i} data-cy="todo-item">
          <S.StatusCheckbox
            type="checkbox"
            checked={item.isComplete}
            onChange={(e) => handleStatusCheckboxChange(e, item.id)}
          ></S.StatusCheckbox>
          <S.ItemTitle data-cy="todo-item-title">{item.title}</S.ItemTitle>
          <S.DeleteButton
            onClick={() => dispatch(deleteItem(item.id))}
            data-cy="todo-delete-btn"
          >
            Delete
          </S.DeleteButton>
        </div>
      ))}
      <S.IncompeteItemsText>
        "There are {countOfIncompleteItems} incomplete items"
      </S.IncompeteItemsText>
      <S.MasterStatusCheckbox
        type="checkbox"
        onChange={handleMasterStatusCheckboxChange}
      ></S.MasterStatusCheckbox>
    </div>
  );
}
