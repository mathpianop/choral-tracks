import RecordingInput from "./RecordingInput.js"

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
      <label>Name</label>
      <input 
        type="text" 
        name="name" 
        value={props.part.name} 
        onChange={handleFormChange}
        required
      />
      <label>Initial</label>
      <input 
        type="text" 
        name="initial" 
        value={props.part.initial} 
        onChange={handleFormChange}
        required
      />
      <RecordingInput
        mode={props.part.mode}
        handleFileUpload={handleFileUpload}
      />
      <button type="button" onClick={removePart}>Remove Part</button>
    </div>
  )
}

export default PartFormlet