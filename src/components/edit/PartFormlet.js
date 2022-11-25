import RecordingInput from "./RecordingInput.js"
import CancelButton from "../general/CancelButton.js";
import "../../style/edit/PartFormlet.css"
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  position: absolute;
  right: 5px;
`

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
    <Draggable 
      draggableId={props.part.key} 
      index={props.index}
      disabled={props.noDrag}
    >
      {(provided) => {
        return <li 
          className={className()}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ButtonWrapper>
            <CancelButton className="remove-part-btn" onClick={removePart} />
          </ButtonWrapper>
          <div className="part-formlet-content">
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
            
            <RecordingInput
              mode={props.part.mode}
              handleFileUpload={handleFileUpload}
            />
          </div>
        </li>
      }}
    </Draggable>
    
  )
}

export default PartFormlet