function PartLoadedEntry(props) {
  const loadedEntryVerbs = function() {
    if (props.loading.type === "create") {
      return {working: "Loading", finished: "Loaded"}
    } else if (props.loading.type === "update") {
      return {working: "Updating", finished: "Updated"}
    } else if (props.loading.type === "destroy") {
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

  const className = () => (props.loading.success ? "working" : "finished");

  return (
    <div className="PartLoadedEntry" >
      <span className={className()}>{content()}</span>
    </div>
  )
}

export default PartLoadedEntry;