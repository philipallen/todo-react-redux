import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectItems,
  selectCountOfIncompleteItems,
  addItem,
  deleteItem,
  toggleItemStatus,
  toggleAllItemsStatuses,
  selectAreAllItemsComplete,
} from "./todoListSlice";
import * as S from "./TodoList.styled";

// TODO split below out to separate components? Could've done but I felt the file size was manageable plus nothing is actually duplicated

export function TodoList() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const countOfIncompleteItems = useSelector(selectCountOfIncompleteItems);
  const areAllItemsComplete = useSelector(selectAreAllItemsComplete);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => setInputValue(e?.target?.value);

  const handleKeyDown = (e) => e.key === "Enter" && handleAddButtonClick();

  const handleAddButtonClick = () => {
    const value = inputValue.trim();
    value.length && dispatch(addItem(inputValue));
    setInputValue("");
  };

  const handleStatusCheckboxChange = (e, itemId) =>
    dispatch(toggleItemStatus({ isChecked: e.target?.checked, itemId }));

  const handleMasterStatusCheckboxChange = (e) =>
    dispatch(toggleAllItemsStatuses(e.target?.checked));

  return (
    <S.TodoList>
      <S.Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        data-cy="input"
      ></S.Input>
      <S.AddButton onClick={handleAddButtonClick} data-cy="add-btn">
        Add
      </S.AddButton>
      {items.map((item, i) => (
        <S.ItemContainer key={i} data-cy="item">
          <S.ItemTitle data-cy="item-title" isComplete={item.isComplete}>
            <S.StatusCheckbox
              type="checkbox"
              checked={item.isComplete}
              onChange={(e) => handleStatusCheckboxChange(e, item.id)}
            ></S.StatusCheckbox>
            {item.title}
          </S.ItemTitle>
          <S.DeleteButton
            onClick={() => dispatch(deleteItem(item.id))}
            data-cy="delete-btn"
          >
            Delete
          </S.DeleteButton>
        </S.ItemContainer>
      ))}
      {items.length ? (
        <>
          <S.IncompeteItemsText>
            Number of incomplete items: {countOfIncompleteItems}
          </S.IncompeteItemsText>
          <S.MasterStatusCheckboxLabel>
            <S.MasterStatusCheckbox
              type="checkbox"
              onChange={handleMasterStatusCheckboxChange}
              checked={areAllItemsComplete}
            ></S.MasterStatusCheckbox>
            Complete all
          </S.MasterStatusCheckboxLabel>
        </>
      ) : null}
    </S.TodoList>
  );
}
