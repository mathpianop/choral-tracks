import styled from "styled-components"
import EditChoir from "../edit/EditChoir"

const NewBanner = styled.h3`
  text-align: center;
  font-weight: 700;
  font-size: 20px;
`

export default function Display({updateChoirs, adminId, selectedChoir}) {

  const content = function() {
    if (selectedChoir) {
      return (
        <EditChoir 
          choir={selectedChoir}
          updateChoirs={updateChoirs}
        />
      )
    } else {
      return `This is the dashboard for Admin #${adminId}`
    }
  }

  const newBanner = function() {
    if(selectedChoir && selectedChoir.choir_details.id === "new") {
      return <NewBanner>New Choir</NewBanner>
    }
  }
  
  return (
    <div id="display">
      {newBanner()}
      {content()}
    </div>

  )
}