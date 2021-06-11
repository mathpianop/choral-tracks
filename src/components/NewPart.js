function NewPart(props) {

  const handleClick = function() {
    props.removePart(props.index)
  }

  const handleChange = function(e)  {
    props.updatePart(props.index, e.target.name, e.target.value);
  }

  

  const handleFileUpload = function(e) {
    props.updatePart(props.index, e.target.name, e.target.files[0]);
  }

  return (
    <div className="NewPart">
      <label>Name</label>
      <input 
        type="text" 
        name="name" 
        value={props.name} 
        onChange={handleChange}
      />
      <label>Initial</label>
      <input 
        type="text" 
        name="initial" 
        value={props.initial} 
        onChange={handleChange}
      />
      <input 
        type="file" 
        accept="audio/*"
        name="recording" 
        onChange={handleFileUpload}
      />
      <button type="button" onClick={handleClick}>Remove Part</button>
    </div>
  )
}

export default NewPart