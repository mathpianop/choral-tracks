import NewSongFormlet from "./NewSongFormlet.js"
import { useState } from "react";
import { apiUrl } from "../apiUrl.js";
import uniqid from "uniqid";
import axios from "axios";
import CancelIcon from "@material-ui/icons/Close";

function SongForm(props) {
  const newPart = function() {
    return [{
      name: "",
      initial: "",
      recording: "",
      key: uniqid()
    }]
  }

  const initializeParts = function() {
    if (props.factoryMode === "new") {
      return newPart()
    } else if (props.factoryMode === "edit") {
      return props.parts
    }
  }
  const [parts, setParts] = useState(initializeParts());
  const [title, setTitle] = useState("");
  

  const closeForm = function() {
    props.setFactoryMode("idle")
    props.setJobStatus("none")
  }

  const handleChange = function(e) {
    setTitle(e.target.value);
  }

  const addPart = function() {
    //Create a new part object and add it to the parts array
    setParts(parts => [...parts, newPart()]);
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

  const sendPart = function(songId, partName, partData, method) {
    axios({
      method: method,
      url: `${apiUrl}/songs/${songId}/parts`,
      data: partData
    })
    .then(response => {
      console.log(response)
      //If the part uploads succesfully, update loading object
      if (response.status === 200) {
        props.setLoading(loading => {
          loading[partName] = true;
          return {...loading};
        })
      }
    })
    .catch(err => {
      props.setJobStatus("failed");
      console.log(err)
    })
  }

  

  const submitPart = function(part, songId, method) {

    //Assemble and set loading object
    const loading = {};
    parts.forEach(part => (loading[part.name] = false));
    props.setLoading(loading);
    //Create a FormData object and append the Part params
    const partData = new FormData();
    ["name", "initial", "recording"].forEach(property => {
      partData.append(property, part[property])
    })
    partData.append("song_id", songId);
    partData.append("pitch_order", parts.indexOf(part))

    //POST/PATCH the Part
    sendPart(songId, part.name, partData, method)
    
  }

  const sendSong = function(songData, method) {
    return axios({
      method: method,
      url: `${apiUrl}/songs`, 
      data: songData
    })
    .catch(err => {
      props.setJobStatus("failed");
      console.log(err)
    });
  }

  const handleSubmit = function(e) {
    e.preventDefault();
    
    const songData = new FormData();
    songData.append("title", title)
    songData.append("parts_promised", parts.length)

    //POST/PATCH the new Song
    let method;
    if (props.factoryMode === "new") {
      method = "post"
    } else if (props.factoryMode === "edit") {
      method = "patch"
    }

    sendSong(songData, method)
    .then(response => {
      //After POSTing/PATCHing the Song, POST/PATCH each of the Song's Parts
      parts.forEach(part => {
        submitPart(part, response.data.id, method)
      })
    })
    props.setFactoryMode("delivery");
    props.setJobStatus("submitting");
  }

  

  return (
    <form className="SongForm" onSubmit={handleSubmit}>
      <button type="button" onClick={closeForm}>
        <CancelIcon />
      </button>
      <label>Song Title</label>
      <input type="text" name="title" value={title} onChange={handleChange}/>
      <NewSongFormlet 
        newPart={newPart}
        updatePart={updatePart}
        removePart={removePart}
        parts={parts}
      />
      <button type="button" className="addPart" onClick={addPart}>Add Part</button>
      <input type="submit" />
    </form>
  )
}

export default SongForm;