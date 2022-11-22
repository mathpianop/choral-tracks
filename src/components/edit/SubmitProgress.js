import PartLoadingEntry from "./PartLoadingEntry.js";
import "../../style/edit/SubmitProgress.css"

function SubmitProgress(props) {
 
  const topMessage = function() {
    switch (props.statusInfo.jobStatus) {
      case "creating":
       return "Creating song...";
      case "updating":
        return "Updating song..."
      case "destroying":
        return "Destroying song...";
      default:
        return "";
    }
  }

  const progressStatus = function() {
    if (props.factoryMode === "delivery") {
      return Object.entries(props.loadings).map(partLoadingEntry => {
        return (
          <PartLoadingEntry
            partName={partLoadingEntry[0]}
            loading={partLoadingEntry[1]}
            key={`${partLoadingEntry[0]}-key`}
          />
        )
      })
    } else {
      return ""
    }
  }

  const responseMessage = function() {
    switch (props.statusInfo.jobStatus) {
      case "submitted":
        return "Song successfully created!";
      case "updated":
        return "Song succesfully updated!";
      case "destroyed":
        return "Song successfully destroyed!";
      case "failedToCreate":
        return "Rats! Song creation could not be completed";
      case "failedToUpdate":
      return "Rats! Song could not be succesfully updated"
      case "failedToDestroy":
        return "Rats! Song could not be succesfully destroyed";
      default:
        return "";
    }
  }
    
  return (
    <div className="SubmitProgress">
      <span className="top-message">{topMessage()}</span>
      <div className="progress-status">
        {progressStatus()}
        <span className="report-message">{responseMessage()}</span>
      </div>
    </div>
  )
}

export default SubmitProgress;