import PartFormlet from "./PartFormlet.js"
import { useState } from "react";
import { apiUrl } from "../apiUrl.js";
import uniqid from "uniqid";
import axios from "axios";
import CancelIcon from "@material-ui/icons/Close";

function SongForm(props) {

  const newPart = function() {
    return {
      name: "",
      initial: "",
      recording: "",
      mode: "new",
      key: uniqid()
    }
  }

  const railsToJs = function(railsPart) {
     //Take Rails Part object and return the React equivalent
     return {
       id: railsPart.id,
       name: railsPart.name,
       initial: railsPart.initial,
       recording: "existing",
       mode: "edit",
       key: uniqid()
     }
  }
   

  const initializeParts = function() {
    //If the SongForm is for a new song or for one without any fulfilled parts,
    //return an array with a single newPart
    if (props.editableParts === undefined) {
      return [newPart()];
    } else {
      let initialParts = [...props.editableParts];
      //Pad initialParts with blank part objects wherever pitch order
      //does not correspond to a fulfilled parts
      for (let i = 0; i < props.editableSong["parts_promised"]; i++) {
        if (i === initialParts[i]["pitch_order"]) {
          //if the index corresonds to a pitch order that has been fulfilled,  
          //replace Rails Part with the React Part
          initialParts.splice(i, 1, railsToJs(initialParts[i]));      
        } else {
          //If not, add a new part at that index
          initialParts.splice(i, 0, newPart());
        }
      }
      return initialParts;
    }
  }

  const initializeTitle = function() {
    //If we are editing the song, initialize with existing title; 
    //otherwise intialize with a blank title
    return (props.factoryMode === "edit" ? props.editableSong.title : "")
  }

  


  const [parts, setParts] = useState(() => initializeParts());
  const [title, setTitle] = useState(() => initializeTitle());
  

  const closeForm = function() {
    props.setFactoryMode("idle")
    props.setJobStatus("none")
  }

  const handleChange = function(e) {
    setTitle(e.target.value);
  }

  const addPart = function() {
    //Create a new part object and add it to the parts array
    const additionalPart = newPart();
    setParts(parts => [...parts, additionalPart]);
    return newPart
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

  const getIdsOfObsoleteParts = function() {
    const oldPartIds = Object.values(props.editableParts).map(part => part.id);
    //Filter out the new parts and get the ids of the parts that are being updated
    const UpdatingPartIds = parts.filter(part => part.id).map(part => part.id);
    return oldPartIds.filter(id => !UpdatingPartIds.includes(id));
  }

  const destroyExistingSong = function() {
    props.setFactoryMode("destruction");
    props.setJobStatus("destroying");
    axios({
      method: "delete",
      url: `${apiUrl}/songs/${props.editableSong.id}`
    })
    .then(response => {
      if (response.status === 200) {
        props.setJobStatus("destroyed");
      }
    })
    .catch(err => {
      props.setJobStatus("failedToDestroy");
      console.log(err)
    })
  }
  
  const destroyExistingPart = function(songId, partId) {
    return axios({
      method: "delete",
      url: `${apiUrl}/songs/${songId}/parts/${partId}`
    })
  }


  const sendPart = function(songId, part, partData) {

    let sentPart;
    if (part.mode === "new") {
      sentPart = axios({
        method: "post",
        url: `${apiUrl}/songs/${songId}/parts`,
        data: partData
      })
    } else if (part.mode === "edit") {
      sentPart = axios({
        method: "patch",
        url: `${apiUrl}/songs/${songId}/parts/${part.id}`,
        data: partData
      })
    }

    sentPart.then(response => {
      //If the part uploads succesfully, update loading object
      if (response.status === 200) {
        props.setLoading(loading => {
          loading[part.name] = true;
          return {...loading};
        })
      }
    })
    .catch(err => {
      props.setJobStatus("failedToCreate");
      console.log(err)
    })
  }

  

  const submitPart = function(part, songId) {

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
    sendPart(songId, part, partData)
    
  }

  const sendSong = function(songData) {
    
    let sentSong;
    if (props.factoryMode === "new") {
      sentSong = axios({
        method: "post",
        url: `${apiUrl}/songs`, 
        data: songData
      })
    } else if (props.factoryMode === "edit") {
      sentSong = axios({
        method: "patch",
        url: `${apiUrl}/songs/${props.editableSong.id}`, 
        data: songData
      })
    }

    return sentSong.catch(err => {
      props.setJobStatus("failed");
      console.log(err)
    });
  }

  const submitSong = function(e) {
    e.preventDefault();
    
    const songData = new FormData();
    songData.append("title", title)
    songData.append("parts_promised", parts.length)
    //POST/PATCH the new Song
    sendSong(songData)
    .then(response => {
      //After sending the Song, submit each of the Song's Parts
      parts.forEach(part => {
        submitPart(part, response.data.id)
      })
    })
    //If this is a PATCH and there any parts being removed, delete them
    props.setFactoryMode("delivery");
    props.setJobStatus("submitting");
    if (props.editableParts) {console.log(getIdsOfObsoleteParts());}
  }

  const submitValue = function() {
    return (props.factoryMode === "new" ? "Submit Song" : "Update Song")
  }

  const deleteBtn = function() {
    if (props.factoryMode === "edit") {
      return (
        <button type="button" onClick={destroyExistingSong}>Delete Song</button>
      )
    }
  }

  

  return (
    <form className="SongForm" onSubmit={submitSong}>
      <button type="button" onClick={closeForm}>
        <CancelIcon />
      </button>
      <label>Song Title</label>
      <input type="text" name="title" value={title} onChange={handleChange}/>
      {parts.map((part, index) => {
        return (
          <PartFormlet
            index={index} 
            key={part.key} 
            part={part}
            updatePart={updatePart}
            removePart={removePart}
          />
        )
    })}
      <button type="button" className="addPart" onClick={addPart}>Add Part</button>
      <input type="submit" value={submitValue()}/>
      {deleteBtn()}
    </form>
  )
}


export default SongForm;