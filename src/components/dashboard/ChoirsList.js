import { List, ListElement } from "../../style/general/list";

export default function ChoirsList({choirs}) {
  return (
    <List>
      {choirs.map(choir => {
        return (
          <ListElement>
            {choir.name}
          </ListElement>
        )
      })}
    </List>
  )
}