import PartLoadingEntry from "./PartLoadingEntry.js";

function SubmitProgress(props) {

  const topMessage = function() {
    switch (props.jobStatus) {
      case "submitting":
       return "Submitting song...";
      case "destroying":
        return "Destroying song...";
      default:
        return "";
    }
  }

  const progressStatus = function() {
    if (props.jobStatus === "submitting") {
      return Object.entries(props.loading).map(partLoadingEntry => {
        return (
          <PartLoadingEntry
            partName={partLoadingEntry[0]}
            loaded={partLoadingEntry[1]}
            key={`${partLoadingEntry[0]}-key`}
          />
        )
      })
    } else {
      return ""
    }
  }

  const responseMessage = function() {
    switch (props.jobStatus) {
      case "submitted":
        return "Song successfully created!";
      case "destroyed":
        return "Song successfully destroyed!"
      case "failedToCreate":
        return "Rats! Song creation could not be completed";
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