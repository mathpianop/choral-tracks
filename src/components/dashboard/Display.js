import EditChoir from "../edit/EditChoir"



export default function Display({updateChoirs, adminId, selectedChoir, cancelNewChoir}) {

  const content = function() {
    if (selectedChoir) {
      return (
        <EditChoir 
          choir={selectedChoir}
          updateChoirs={updateChoirs}
          cancelNewChoir={cancelNewChoir}
        />
      )
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