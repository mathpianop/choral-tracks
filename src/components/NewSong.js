import NewPart from "./NewPart.js";
import { useState } from "react";
import uniqid from "uniqid";
import axios from "axios";

function NewSong() {
  const part = function() {
    return {
      name: "",
      initial: "",
      recording: "",
      key: uniqid()
    }
  }

  const [parts, setParts] = useState([part()]);

  const addPart = function() {
    //Create a new part object and add it to the parts array
    const newPart = part();
    setParts(parts => [...parts, newPart]);
  }

  const removePart = function(index) {
    // Remove the part's uniqid from the partKeys array
    const oldParts = parts;
    oldParts.splice(index, 1);
    setParts([...oldParts]);
  }

  const updatePart = function(index, property, newValue) {
    const oldParts = parts;
    oldParts[index][property] = newValue;
    setParts([...oldParts]);
  }
  return (
    <form className="NewSong">
      {parts.map((part, index) => {
        return (
          <NewPart
            index={index} 
            key={part.key} 
            name={part.name}
            initial={part.initial}
            recording={part.recording}
            updatePart={updatePart}
            removePart={removePart}
          />
        )
      })}
      <button type="button" className="addPart" onClick={addPart}>Add Part</button>
      <input type="submit" />
    </form>
  )
}

export default NewSong