import EditChoir from "../edit/EditChoir"

export default function Display({adminId, selectedChoir}) {

  const content = function() {
    if (selectedChoir) {
      return <EditChoir 
                choirId={selectedChoir.choir_details.id} 
                providedChoir={selectedChoir}
              />
    } else {
      return `This is the dashboard for Admin #${adminId}`
    }
  }
  
  return (
    <div id="display">
      {content()}
    </div>

  )
}