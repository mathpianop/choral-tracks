import { List, ListElement } from "../../style/general/list";
import styled from "styled-components";
import ChoirTab from "./ChoirTab";

const LeftNav = styled.div`
  width: 264px;
  height: 100%;
`

export default function ChoirsList({choirs, setSelectedChoirId, selectedChoirId}) {
  
  const handleAdd = function() {
    setSelectedChoirId("new");
  }

  const addBtn = function() {
    if (selectedChoirId !== "new") {
      return (
        <ListElement>
        <div onClick={handleAdd}>+</div>
      </ListElement>
      )
    }
  }

  return (
    <LeftNav>
      <List>
        {choirs.map(choir => {

          return (
          <ChoirTab 
            key={choir.choir_details.id}
            choirDetails={choir.choir_details}
            setSelectedChoirId={setSelectedChoirId}
            selectedChoirId={selectedChoirId}
          />)
        })}
       {addBtn()}
      </List>
    </LeftNav>
   
  )
}