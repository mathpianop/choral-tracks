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
    //Call either emphasizePart or isolatePart
    props.handler(props.partName)
    //Apply the "selected" className by setting selectedPreference in state
    props.setSelectedPreference({
      role: props.role,
      partName: props.partName
    });
  }

  return (
    <button className={classList()} onClick={handleClick}>
      {props.content}
    </button>
  )
}

export default PreferenceBtn;