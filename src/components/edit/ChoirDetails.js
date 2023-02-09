import { useState } from "react";

export default function ChoirDetails({choirDetails}) {
  const [choirName, setChoirName] = useState(choirDetails.name);
  const [message, setMessage] = useState(choirDetails.message);

  const handleChange = function(e, setter) {
    setter(e.target.value);
  }
  
  return (
    <form>
      <label for="choirName">Give your choir a name:</label>
      <input name="choirName" type="text" value={choirName} onChange={e => handleChange(e, setChoirName)}/>
      <label for="message">Include a message or description at the top the choir page: </label>
      <textarea name="message" value={message} onChange={e => handleChange(e, setMessage)}/>
    </form>
  )
}