import PartFormlet from "./PartFormlet.js"
import { useState } from "react";
import { apiUrl } from "../apiUrl.js";
import uniqid from "uniqid";
import axios from "axios";
import "../style/SongForm.css";

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
    if (!props.editableParts) {
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
    //Remove part form parts array if there is more than one part
    if (parts.length > 1) {
      const oldParts = parts;
      oldParts.splice(index, 1);
      setParts([...oldParts]);
    }
  }

  const updatePart = function(index, property, newValue) {
    const oldParts = parts;
    //Select part/property and assign the new value
    oldParts[index][property] = newValue;
    setParts([...oldParts]);
  }

  const assembleLoadingsObject = function(loadingParts) {
    props.setLoadings(loadings => {
      loadings = {}
      loadingParts.forEach(part => {
        loadings[part.name] = {success: false, mode: part.mode}
      });
      return {...loadings}
    });
  }

  const updateLoadingsObject = function(part) {
    props.setLoadings(loadings => {
      loadings[part.name].success = true;
      return {...loadings};
    });
  }

  const getObsoleteParts = function() {
    const oldParts = Object.values(props.editableParts);
    //Filter out the new parts (which don't have an id)
    //and get the ids of the remaining parts (which are being updated)
    const UpdatingPartIds = parts.filter(part => part.id).map(part => part.id);
    return oldParts.filter(part => !UpdatingPartIds.includes(part.id));
  }

  const deleteObsoleteParts = function() {
    const obsoleteParts = getObsoleteParts();
    props.setLoadings(loadings => {
      //Add a loading object for each part to loadings
      obsoleteParts.forEach(part => {
        loadings[part.name] = {success: false, mode: "destroy"}
      })
      return {...loadings}
    })
    obsoleteParts.forEach(part => {
      destroyExistingPart(props.editableSong.id, part)
    });
  }

  const destroyExistingSong = function() {
    props.setFactoryMode("destruction");
    props.setJobStatus("destroying");
    axios({
      method: "delete",
      url: `${apiUrl}/songs/${props.editableSong.id}`,
      headers: { Authorization: `Bearer ${props.token}` }
    })
    .then(response => {
      if (response.status === 200) {
        props.setJobStatus("destroyed");
      }
    })
    .catch(err => {
      props.setJobStatus("failedToDestroy");
    })
  }
  
  const destroyExistingPart = function(songId, part) {
    axios({
      method: "delete",
      url: `${apiUrl}/songs/${songId}/parts/${part.id}`,
      headers: { Authorization: `Bearer ${props.token}` }
    })
    .then(response => {
      //If the part destroys succesfully, update loadings object
      if (response.status === 200) {
        updateLoadingsObject(part);
      }
    })
    .catch(err => console.log(err))
  }

  const sendPart = function(songId, part, partData) {
    //Assemble Axios request 
    const method = (part.mode === "new" ? "post" : "patch")
    const id = (part.mode === "new" ? "" : part.id)
    const sentPart = axios({
      method: method,
      url: `${apiUrl}/songs/${songId}/parts/${id}`,
      data: partData,
      headers: { Authorization: `Bearer ${props.token}` }
    })

    sentPart.then(response => {
      //If the part uploads succesfully, update loadings object
      //functionize
      if (response.status === 200) {
        updateLoadingsObject(part);
      }
    })
    .catch(err => {
      if (props.factoryMode === "new") {
         props.setJobStatus("failedToCreate");
      } else if (props.factoryMode === "edit") {
        props.setJobStatus("failedToUpdate")
      }
    })
  }

  const submitPart = function(part, songId) {
    //Create a FormData object and append the Part params
    const partData = new FormData();
    partData.append("name", part.name);
    partData.append("initial", part.initial);
    partData.append("recording", part.recording)
    partData.append("song_id", songId);
    partData.append("pitch_order", parts.indexOf(part))
    //POST/PATCH the Part
    sendPart(songId, part, partData)
  }

  const sendSong = function(songData) {
    //Assemble axios request
    const method = (props.factoryMode === "new" ? "post" : "patch")
    const id = (props.factoryMode === "new" ? "" : props.editableSong.id)
    const sentSong = axios({
      method: method,
      url: `${apiUrl}/songs/${id}`, 
      data: songData,
      headers: { Authorization: `Bearer ${props.token}` }
    })
    //If response status is 400, set jobStatus to appropriate failure status
    return sentSong.catch(err => {
      if (props.setFactoryMode === "new") {
        props.setJobStatus("failedToCreate");
      } else if (props.setFactoryMode === "edit") {
        props.setJobStatus("failedToUpdate")
      }
      console.log(err)
    });
  }

  const submitSong = function(e) {
    e.preventDefault();
    ///Add a loading object for each part to loadings
    //functionize
    assembleLoadingsObject(parts)
    //Assemble the FormData object
    const songData = new FormData();
    songData.append("title", title)
    songData.append("parts_promised", parts.length)
    //POST or PATCH the new Song
    sendSong(songData)
    .then(response => {
      //After sending the Song, submit each of the Song's Parts
      parts.forEach(part => {
        submitPart(part, response.data.id)
      })
    })
    //If this is a PATCH and there any parts being removed, delete them
    if (props.editableParts) {
      deleteObsoleteParts();
    }
    //set jobStatus to the appropriate delivery status
    if (props.factoryMode === "new") {
      props.setJobStatus("creating");
    } else if (props.factoryMode === "edit") {
      props.setJobStatus("updating")
    }
    props.setFactoryMode("delivery");
  }

  const submitValue = function() {
    return (props.factoryMode === "new" ? "Submit Song" : "Update Song")
  }

  const handleDestroySong = function() {
    const confirmation = window.confirm("Do you really want to delete this song?");
    if (confirmation) {
     destroyExistingSong(); 
    }
  }

  const deleteBtn = function() {
    //If we are editing an existing song, display button to delete Song
    if (props.factoryMode === "edit") {
      return (
        <button type="button" onClick={handleDestroySong}>Delete Song</button>
      )
    }
  }

  return (
    <form className="SongForm" onSubmit={submitSong}>
      <input 
        type="text" 
        name="title" 
        className="song-title-input"
        placeholder="Song Title"
        value={title} 
        onChange={handleChange}
      />
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
      <button type="button" onClick={closeForm} className="song-form-cancel">
        Cancel
      </button>
    </form>
  )
}

export default SongForm;