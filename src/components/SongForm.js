import PartFormlet from "./PartFormlet.js"
import { useEffect, useState } from "react";
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

  const destroyExistingSong = async function(cancelSources) {
    props.setFactoryMode("destruction");
    try {
      const response = await axios({
        method: "delete",
        url: `${apiUrl}/songs/${props.editableSong.id}`,
        headers: { Authorization: `Bearer ${props.token}` },
        cancelToken: cancelSources[0].token
      })
      if (response.status === 200) {
        props.setJobStatus("destroyed");
        props.setFactoryMode("idle");
      }
    } catch(err) {
      props.setJobStatus("failedToDestroy");
      props.setFactoryMode("idle");
    }
  }
  
  const destroyExistingPart = async function(songId, part) {
    try {
      const response = await axios({
        method: "delete",
        url: `${apiUrl}/songs/${songId}/parts/${part.id}`,
        headers: { Authorization: `Bearer ${props.token}` }
      })    
      //If the part destroys succesfully, update loadings object
      if (response.status === 200) {
        updateLoadingsObject(part);
      }
    } catch(err) {
      console.log(err)
    }
  }

  const sendPart = async function(songId, part, partData, cancelSource) {
    //Assemble Axios request 
    const method = (part.mode === "new" ? "post" : "patch")
    const id = (part.mode === "new" ? "" : part.id)
    try {
      const response = await axios({
        method: method,
        url: `${apiUrl}/songs/${songId}/parts/${id}`,
        data: partData,
        headers: { Authorization: `Bearer ${props.token}` },
        cancelToken: cancelSource.token
      })
      //If the part uploads succesfully, update loadings object
      //functionize
      if (response.status === 200) {
        updateLoadingsObject(part);
      }
    } catch (err) {
      if (props.factoryMode === "new") {
        props.setJobStatus("failedToCreate");
        props.setFactoryMode("idle");
     } else if (props.factoryMode === "edit") {
       props.setJobStatus("failedToUpdate");
       props.setFactoryMode("idle");
     }
    }
  }

  const submitPart = function(part, songId, cancelSource) {
    //Create a FormData object and append the Part params
    const partData = new FormData();
    partData.append("name", part.name);
    partData.append("initial", part.initial);
    partData.append("recording", part.recording)
    partData.append("song_id", songId);
    partData.append("pitch_order", parts.indexOf(part))
    //POST/PATCH the Part
    sendPart(songId, part, partData, cancelSource)
  }

  const sendSong = function(songData, cancelSource) {
    //Assemble axios request
    const method = (props.factoryMode === "new" ? "post" : "patch")
    const id = (props.factoryMode === "new" ? "" : props.editableSong.id)
    try {
      return axios({
        method: method,
        url: `${apiUrl}/songs/${id}`, 
        data: songData,
        headers: { Authorization: `Bearer ${props.token}` },
        cancelToken: cancelSource.token
      })
      //If response status is 400, set jobStatus to appropriate failure status
    } catch (err) {
      if (props.setFactoryMode === "new") {
        props.setJobStatus("failedToCreate");
        props.setFactoryMode("idle");
      } else if (props.setFactoryMode === "edit") {
        props.setJobStatus("failedToUpdate");
        props.setFactoryMode("idle");
      }
      console.log(err);
    }
  }

  const submitSong = async function(cancelSources) {
    ///Add a loading object for each part to loadings
    assembleLoadingsObject(parts)
    //If this is a PATCH and there any parts being removed, delete them
    if (props.editableParts) {
      deleteObsoleteParts();
    }
    props.setFactoryMode("delivery");

    //Assemble the FormData object
    const songData = new FormData();
    songData.append("title", title)
    songData.append("parts_promised", parts.length)
    //POST or PATCH the new Song
    const response = await sendSong(songData, cancelSources[0])
    //After sending the Song, submit each of the Song's Parts
    parts.forEach((part, index) => {
      submitPart(part, response.data.id, cancelSources[index + 1])
    })
  }

  const submitValue = function() {
    return (props.factoryMode === "new" ? "Submit Song" : "Update Song")
  }


  const deleteBtn = function() {
    //If we are editing an existing song, display button to delete Song
    if (props.factoryMode === "edit") {
      return (
        <button type="button" className="pseudo-btn" onClick={handleDestroySong}>Delete Song</button>
      )
    }
  }

  const handleDestroySong = function() {
    const confirmation = window.confirm("Do you really want to delete this song?");
    if (confirmation) {
     props.setJobStatus("destroying")
    }
  }

  const handleSubmit = function(e) {
    e.preventDefault();
    //set jobStatus to the appropriate delivery status
    if (props.factoryMode === "new") {
      props.setJobStatus("creating")
    } else {
      props.setJobStatus("updating")
    }
  }


  useEffect(() => {
    if (props.jobStatus === "creating" || props.jobStatus === "updating") {
      //Fill an array with one Axios Cancel Token source per part request
      var cancelSources = parts.map(() => axios.CancelToken.source())
      //Add in one more for the song request itself
      cancelSources.push(axios.CancelToken.source())
      submitSong(cancelSources)
    } else if (props.jobStatus === "destroying") {
      var cancelSources = [axios.CancelToken.source()];
      destroyExistingSong(cancelSources)
    }
    //When Component unmounts, cancel all of the Axios requests
    return () => cancelSources.forEach(source => source.cancel())
  }, [props.jobStatus])

  return (
    <form className="SongForm" onSubmit={handleSubmit}>
      <div className="title-bar">
        
        <input 
          type="text" 
          name="title" 
          className="text-input song-title-input"
          placeholder="Song Title"
          value={title} 
          onChange={handleChange}
        />
      </div>
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
      <div className="main-form-btns">
        <button 
          type="button" 
          className="pseudo-btn" 
          id="add-part-btn" 
          onClick={addPart}
        >
          Add Part
        </button>
        <button type="button" className="song-form-cancel pseudo-btn" onClick={closeForm}>
          Cancel
        </button>
        {deleteBtn()}
        <input type="submit" className="pseudo-btn" value={submitValue()}/>
      </div>
      
    </form>
  )
}

export default SongForm;