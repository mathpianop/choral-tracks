import NewPart from "./NewPart.js";
import { useState } from "react";
import { apiUrl } from "../apiUrl.js"
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

  const [title, setTitle] = useState("");
  const [parts, setParts] = useState([part()]);

  const handleChange = function(e) {
    setTitle(e.target.value);
  }

  const addPart = function() {
    //Create a new part object and add it to the parts array
    const newPart = part();
    setParts(parts => [...parts, newPart]);
  }

  const removePart = function(index) {
    const oldParts = parts;
    oldParts.splice(index, 1);
    setParts([...oldParts]);
  }

  const updatePart = function(index, property, newValue) {
    const oldParts = parts;
    oldParts[index][property] = newValue;
    setParts([...oldParts]);
  }

  const handleSubmit = function(e) {
    e.preventDefault();
      axios({
        method: "post",
        url: `${apiUrl}/songs`, 
        data: {title: title}
      })
      .then(response => {
        
        parts.forEach(part => {
          const partData = new FormData();
          const songId = response.data.id;
          ["name", "initial", "recording"].forEach(property => {
            partData.append(property, part[property])
          })
          partData.append("song_id", response.data.id);
          partData.append("pitch_order", parts.indexOf(part))

          axios({
            method: "post",
            url: `${apiUrl}/songs/${songId}/parts`,
            data: partData
          })
          .then(response => console.log(response))
          .catch(err => console.log(err))
        })
      })
      .catch(err => {
        console.log(err)
      })
      

      
      
      
      
  }
  return (
    <form className="NewSong" onSubmit={handleSubmit}>
      <label>Song Title</label>
      <input type="text" name="title" value={title} onChange={handleChange}/>
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