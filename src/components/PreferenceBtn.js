import "../style/PreferenceBtn.css";

function PreferenceBtn(props) {
  const initial = function(string) {
    return string.charAt(0).toUpperCase() 
  }

  const selectedClassName = function() {
    return (props.selected ? "selected" : "")
  }

  const handleClick = function() {
    //This calls either emphasizePart or isolatePart
    props.handler(props.part)
  }

  return (
    <button className={`PreferenceBtn ${selectedClassName()}`} onClick={handleClick}>
      {initial(props.part)}
    </button>
  )
}

export default PreferenceBtn;