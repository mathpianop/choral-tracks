import RecordingInput from "./RecordingInput.js"
import CancelIcon from "@material-ui/icons/Close";
import "../style/PartFormlet.css"

function PartFormlet(props) {

  const removePart = function() {
    props.removePart(props.index)
  }

  const handleFormChange = function(e)  {
    props.updatePart(props.index, e.target.name, e.target.value);
  }

  const handleFileUpload = function(e) {
    props.updatePart(props.index, e.target.name, e.target.files[0]);
  }

  return (
    <div className="PartFormlet">
      <span className="part-number">{`Part ${props.index + 1}`}</span>
      <input 
        type="text" 
        name="name" 
        placeholder="Name"
        value={props.part.name} 
        onChange={handleFormChange}
        required
      />
      <input 
        type="text" 
        name="initial" 
        className="initial-input"
        placeholder="Initial"
        value={props.part.initial} 
        onChange={handleFormChange}
        required
      />
      <RecordingInput
        mode={props.part.mode}
        handleFileUpload={handleFileUpload}
      />
      <button type="button" onClick={removePart}>
        <CancelIcon />
      </button>
    </div>
  )
}

export default PartFormlet