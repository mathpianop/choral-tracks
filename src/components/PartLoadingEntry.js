function PartLoadedEntry(props) {
  const loadedEntryVerbs = function() {
    if (props.contentloaded.type === "create") {
      return {working: "Loading", finished: "Loaded"}
    } else if (props.loaded.type === "update") {
      return {working: "Updating", finished: "Updated"}
    } else if (props.loaded.type === "destroy") {
      return {working: "Destroying", finished: "Destroyed"}
    }
  }
  const content = function() {
    if (props.loaded.success) {
      return `${props.partName}: ${loadedEntryVerbs().finished}`;
    } else {
      return `${props.partName}: ${loadedEntryVerbs().working}`;
    }
  }

  const className = () => (props.loaded ? "working" : "finished");

  return (
    <div className="PartLoadedEntry" >
      <span className={className()}>{content()}</span>
    </div>
  )
}

export default PartLoadedEntry;