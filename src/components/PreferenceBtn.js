import "../style/PreferenceBtn.css";

function PreferenceBtn(props) {

  const classList = function() {
    const selected = (props.selected ? " selected" : "")
    if (props.role === "full-choir") {
      return "PreferenceBtn full-choir" + selected
    } else {
      return "PreferenceBtn" + selected
    }
  }

  const handleClick = function() {
    //This calls either emphasizePart or isolatePart
    props.handler(props.part.name)
    //This applies the "selected" className
    props.setSelectedPreference({
      role: props.role,
      part: props.part.name
    });
  }

  

  return (
    <button className={classList()} onClick={handleClick}>
      {props.content}
    </button>
  )
}

export default PreferenceBtn;