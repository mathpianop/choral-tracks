import { List, ListElement } from "../../style/general/list";
import styled from "styled-components";
import Choir from "../../models/Choir";

const LeftNav = styled.div`
  width: 264px;
  height: 100%;
`

export default function ChoirsList({choirs, setSelectedChoir}) {
  
  const handleAdd = function() {
    setSelectedChoir(Choir());
  }

  return (
    <LeftNav>
      <List>
        {choirs.map(choir => {

          return (
              <ListElement 
                key={choir.choir_details.id}
                onClick={() => setSelectedChoir(choir)}
              >
                {choir.choir_details.name}
              </ListElement>
          )
        })}
        <ListElement>
          <div onClick={handleAdd}>+</div>
        </ListElement>
      </List>
    </LeftNav>
   
  )
}