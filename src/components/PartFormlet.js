import RecordingInput from "./RecordingInput.js"
import CancelIcon from "@material-ui/icons/Close";
import "../style/PartFormlet.css"
import { Draggable } from "react-beautiful-dnd";

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

  const className = function() {
    return (props.part.mode === "edit" ? "PartFormlet edit-part" : "PartFormlet")
  }

  return (
    <Draggable draggableId={props.part.key} index={props.index}>
      {(provided) => {
        return <li 
          className={className()}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h4 className="part-number">{`Part ${props.index + 1}`}</h4>
          <input 
            type="text" 
            name="name" 
            className="text-input"
            placeholder="Name"
            value={props.part.name} 
            onChange={handleFormChange}
            required
          />
          <input 
            type="text" 
            name="initial" 
            className="text-input initial-input"
            placeholder="Initial"
            value={props.part.initial} 
            onChange={handleFormChange}
            required
          />
          <button type="button" className="remove-part-btn" onClick={removePart}>
            <CancelIcon />
          </button>
          <RecordingInput
            mode={props.part.mode}
            handleFileUpload={handleFileUpload}
          />
        </li>
      }}
    </Draggable>
    
  )
}

export default PartFormlet