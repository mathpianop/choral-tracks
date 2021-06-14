import NewPart from "./NewPart.js";
import { useState } from "react";
import { apiUrl } from "../apiUrl.js";
import uniqid from "uniqid";
import axios from "axios";
import CancelIcon from "@material-ui/icons/Close";

function NewSong(props) {
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

  const closeForm = function() {
    props.setFactoryMode("idle")
  }

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
    //Select part/property and assign the new value
    oldParts[index][property] = newValue;
    setParts([...oldParts]);
  }

  const postPart = function(part, songId) {
    //Create a FormData object and append the Part params
    const partData = new FormData();
    ["name", "initial", "recording"].forEach(property => {
      partData.append(property, part[property])
    })
    partData.append("song_id", songId);
    partData.append("pitch_order", parts.indexOf(part))

    axios({
      method: "post",
      url: `${apiUrl}/songs/${songId}/parts`,
      data: partData
    })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        props.setProgressMessage(`${part.name} Loaded`)
      }
    })
    .catch(err => console.log(err))
  }

  const handleSubmit = function(e) {
    e.preventDefault();
    //POST the new Song
    axios({
      method: "post",
      url: `${apiUrl}/songs`, 
      data: {title: title}
    })
    //After POSTing the Song, POST each of the Song's Parts
    .then((response) => parts.forEach(part => postPart(part, response.data.id)))
    .then(console.log("Done?"))
    .catch(err => console.log(err));

    props.setFactoryMode("submitting");
  }
  return (
    <form className="NewSong" onSubmit={handleSubmit}>
      <button type="button" onClick={closeForm}>
        <CancelIcon />
      </button>
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