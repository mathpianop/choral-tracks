import { useState } from "react";

function RecordingInput(props) {
  const [acceptNewRecording, setAcceptNewRecording] = useState(props.mode === "new");

  const overrideRecording = function() {
    setAcceptNewRecording(true)
  }

  const revertToOldRecording = function() {
    setAcceptNewRecording(false)
  }

  const content = function() {
    if (acceptNewRecording && props.mode === "new") {
      return (
        <input 
          type="file" 
          accept="audio/*"
          name="recording" 
          onChange={props.handleFileUpload}
          required
        />
      )
    } else if (acceptNewRecording && props.mode === "edit") {
      return (
        <div className="override-recording">
          <input 
            type="file" 
            accept="audio/*"
            name="recording" 
            onChange={props.handleFileUpload}
            required
          />
          <button onClick={revertToOldRecording}>
            Revert to Previous Recording
          </button>
        </div>
       
      )
    } else {
      return (
        <button type="button" onClick={overrideRecording}>
          Override Recording
        </button>
      )
    }
  }
  return (
    <div className="RecordingInput">
      {content()}
    </div>
  )
}

export default RecordingInput;
