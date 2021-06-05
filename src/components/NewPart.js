function NewPart(props) {
  const handleClick = function() {
    props.removePart(props.index)
  }

  const handleChange = function(e)  {
    props.updatePart(props.index, e.target.name, e.target.value);
  }

  return (
    <div className="NewPart">
      <label>Name</label>
      <input type="text" name="name" value={props.name} onChange={handleChange}/>
      <label>Initial</label>
      <input type="text" name="initial" value={props.initial} onChange={handleChange}/>
      <input type="file" name="recording" value={props.recording} onChange={handleChange}/>
      <button type="button" onClick={handleClick}>Remove Part</button>
    </div>
  )
}

export default NewPart