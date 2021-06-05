function NewPart(props) {
  const handleClick = () => props.removePart(props.index)

  return (
    <div className="NewPart">
      <label>Name</label>
      <input type="text" name="name"/>
      <label>Initial</label>
      <input type="text" name="initial" />
      <input type="file" name="recording" />
      <button type="button" onClick={handleClick}>Remove Part</button>
    </div>
  )
}

export default NewPart