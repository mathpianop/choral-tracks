import NewPart from "./NewPart.js";
import { useState } from "react";
import uniqid from "uniqid";

function NewSong() {
  const [partKeys, setPartKeys] = useState([uniqid()]);

  const addPart = function() {
    //Create a new uniqid and add it to the partIds array
    const newKey = uniqid();
    setPartKeys(partKeys => [...partKeys, newKey]);
  }

  const removePart = function(index) {
    // Remove the part's uniqid from the partKeys array
    const oldPartKeys = partKeys;
    oldPartKeys.splice(index, 1);
    setPartKeys([...oldPartKeys]);
  }
  return (
    <form className="NewSong">
      {partKeys.map((partKey, index) => {
        return (
          <NewPart index={index} key={partKey} removePart={removePart}/>
        )
      })}
      <button type="button" className="addPart" onClick={addPart}>Add Part</button>
      <input type="submit" />
    </form>
  )
}

export default NewSong