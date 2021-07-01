import { useState } from "react";
import "../style/RecordingInput.css"

function RecordingInput(props) {
  const [acceptNewRecording, setAcceptNewRecording] = useState(props.mode === "new");

  const overrideRecording = function() {
    setAcceptNewRecording(true)
  }

  const revertToOldRecording = function() {
    setAcceptNewRecording(false)
  }

  const content = function() {
    if (props.mode === "new") {
      //If we are creating a new song, display button to upload new recording
      return (
        <input 
          type="file" 
          accept="audio/*"
          name="recording" 
          onChange={props.handleFileUpload}
          required
        />
      )
      //If we are overriding the old recording, display button to upload new recording,
      //but also button to revert to back to the old one
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
          <button className="revert-btn" onClick={revertToOldRecording}>
            Revert to Existing Recording
          </button>
        </div>
       
      )
      //If we are editing the song, display button to override recording
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
