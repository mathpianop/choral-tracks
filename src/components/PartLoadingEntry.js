function PartLoadedEntry(props) {
  const content = function() {
    if (props.loaded) {
      return `${props.partName}: Loaded`;
    } else {
      return `${props.partName}: Loading`;
    }
  }

  const className = () => (props.loaded ? "loaded" : "loading");

  return (
    <div className="PartLoadedEntry" >
      <span className={className()}>{content()}</span>
    </div>
  )
}

export default PartLoadedEntry;