function PartLoadedEntry(props) {

  const loadedEntryVerbs = function() {
    // Return status verbs based on whether mode is create, update, or destroy
    if (props.loading.mode === "create") {
      return {working: "Loading", finished: "Loaded"}
    } else if (props.loading.mode === "update") {
      return {working: "Updating", finished: "Updated"}
    } else if (props.loading.mode === "destroy") {
      return {working: "Destroying", finished: "Destroyed"}
    }
  }
  const content = function() {
    if (props.loading.success) {
      return `${props.partName}: ${loadedEntryVerbs().finished}`;
    } else {
      return `${props.partName}: ${loadedEntryVerbs().working}`;
    }
  }

  //Apply "working" or "finished" className depending whether loading complete
  const className = () => (props.loading.success ? "working" : "finished");

  return (
    <div className="PartLoadedEntry" >
      <span className={className()}>{content()}</span>
    </div>
  )
}

export default PartLoadedEntry;