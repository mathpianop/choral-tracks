function PreferenceBtn(props) {
  const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const handleClick = function() {
    //This calls either emphasizePart or isolatePart
    props.handler(props.part)
  }

  return (
    <button className="PreferenceBtn" onClick={handleClick}>
      {capitalize(props.role)} {capitalize(props.part)}
    </button>
  )
}

export default PreferenceBtn;