import { List, ListElement } from "../../style/general/list";
import styled from "styled-components";

const LeftNav = styled.div`
  width: 264px;
  height: 100%;
`

export default function ChoirsList({choirs, setSelectedChoir}) {
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
      </List>
    </LeftNav>
  )
}