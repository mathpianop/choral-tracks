import styled from "styled-components";



const ListElement = styled.li`
    list-style: none;
    border: 1px solid lightgray;
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 3px;
    background-color: white;
    cursor: pointer;
  `;

  const HighlightedListElement = styled(ListElement)`
    border: 3px solid green;
  `

  const List = styled.ul`
    padding: 20px;
    background-color: rgb(241, 236, 236);
    height: 100%;
`;

  export { ListElement, List, HighlightedListElement}