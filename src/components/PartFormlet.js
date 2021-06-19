import { useState } from "react";

function PartFormlet(props) {

  const [
    useUploadedRecording, 
    setUseUploadedRecording
  ] = useState(props.part.mode === "edit");

  const removePart = function() {
    props.removePart(props.index)
  }

  const handleFormChange = function(e)  {
    props.updatePart(props.index, e.target.name, e.target.value);
  }

  const handleFileUpload = function(e) {
    props.updatePart(props.index, e.target.name, e.target.files[0]);
  }

  const overrideRecording = function() {
    setUseUploadedRecording(true);
  }

  const recordingInput = function() {
    if (useUploadedRecording) {
      return (
        <button type="button" onClick={overrideRecording}>
          Override Recording
        </button>
      )
    } else {
      return (
        <input 
          type="file" 
          accept="audio/*"
          name="recording" 
          onChange={handleFileUpload}
        />
      )
    }
  }

  return (
    <div className="NewPart">
      <label>Name</label>
      <input 
        type="text" 
        name="name" 
        value={props.part.name} 
        onChange={handleFormChange}
      />
      <label>Initial</label>
      <input 
        type="text" 
        name="initial" 
        value={props.part.initial} 
        onChange={handleFormChange}
      />
      {recordingInput()}
      <button type="button" onClick={removePart}>Remove Part</button>
    </div>
  )
}

export default PartFormlet