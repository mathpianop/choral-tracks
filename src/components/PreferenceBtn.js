import "../style/PreferenceBtn.css";

function PreferenceBtn(props) {

  const selectedClassName = function() {
    return (props.selected ? "selected" : "")
  }

  const handleClick = function() {
    //This calls either emphasizePart or isolatePart
    props.handler(props.part)
  }

  return (
    <button className={`PreferenceBtn ${selectedClassName()}`} onClick={handleClick}>
      {props.initial}
    </button>
  )
}

export default PreferenceBtn;