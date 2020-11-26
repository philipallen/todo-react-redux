import styled from "styled-components";

export const TodoList = styled.div`
  max-width: 300px;
  margin: 1rem auto;
`;

export const Input = styled.input``;

export const ItemContainer = styled.div`
  display: flex;
  margin: 1rem 0;
`;

export const ItemTitle = styled.label`
  color: ${(props) => (props.isComplete ? "grey" : "black")};
  text-decoration: ${(props) => (props.isComplete ? "line-through" : "none")};
`;

export const AddButton = styled.button``;

export const DeleteButton = styled.button`
  margin-left: 1rem;
`;

export const StatusCheckbox = styled.input``;

export const IncompeteItemsText = styled.div`
  margin: 1rem 0;
`;

export const MasterStatusCheckboxLabel = styled.label``;

export const MasterStatusCheckbox = styled.input``;
