import { ListElement, HighlightedListElement } from "../../style/general/list"

export default function ChoirTab(
    {choirDetails, 
    setSelectedChoirId, 
    selectedChoirId
  }) {

  
  const handleClick = function(e) {
    setSelectedChoirId(choirDetails.id)
  }
  const content = function() {
    if (choirDetails.id === selectedChoirId) {
      return (
        <HighlightedListElement onClick={handleClick}>
          {choirDetails.name}
        </HighlightedListElement>
      )
    } else {
      return (
        <ListElement onClick={handleClick}>
          {choirDetails.name}
        </ListElement>
      )
    }
  }

  return content()
}