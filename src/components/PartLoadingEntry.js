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
    <span className="PartLoadedEntry" className={className()}>
      {content()}
    </span>
  )
}

export default PartLoadedEntry;