import PartLoadingEntry from "./PartLoadingEntry.js";

function SubmitProgress(props) {
  const progressStatusContent = function() {
    return Object.entries(props.loading).map(partLoadingEntry => {
      return (
        <PartLoadingEntry
          partName={partLoadingEntry[0]}
          loaded={partLoadingEntry[1]}
          key={`${partLoadingEntry[0]}-key`}
        />
      )
    })
  }

  const successMessage = function() {
    if (props.jobStatus === "submitted"){
      return "Song created succesfully!"
    } else {
      return "";
    }
  }
    
  return (
    <div className="SubmitProgress">
      <span>Submitting</span>
      <div className="progress-status">
        {progressStatusContent()}
        <span className="success-message">{successMessage()}</span>
      </div>
    </div>
  )
}

export default SubmitProgress;