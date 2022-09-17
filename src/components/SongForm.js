import PartFormlet from "./PartFormlet.js"
import { useState } from "react";
import Part from "../models/Part";
import "../style/SongForm.css";
import destroySong from "../network/destroySong.js";
import destroyPart from "../network/destroyPart.js";
import SongSender from "../network/SongSender.js";

function SongForm(props) {
   
  const initializeParts = function() {
    //If the SongForm is for a new song or for one without any fulfilled parts,
    //return an array with a single blank Part
    console.log(props.editableParts)
    if (props.editableParts && props.editableParts.length > 0) {
      console.log("Hello")
      return props.editableParts.map(Part);
    } else {
      console.log("World")
      return [Part()];
    }
  }

  const initializeTitle = function() {
    //If we are editing the song, initialize with existing title; 
    //otherwise intialize with a blank title
    return (props.statusInfo.factoryMode === "edit" ? props.editableSong.title : "")
  }

  const [parts, setParts] = useState(() => initializeParts());
  const [title, setTitle] = useState(() => initializeTitle());
  
  const closeForm = function() {
    props.setStatusInfo(statusInfo => statusInfo.reset());
  }

  const handleChange = function(e) {
    setTitle(e.target.value);
  }

  const addPart = function() {
    //Create a new part object and add it to the parts array
    const additionalPart = Part();
    setParts(parts => [...parts, additionalPart]);
    return additionalPart;
  }

  const removePart = function(index) {
    //Remove part form parts array if there is more than one part
    if (parts.length > 1) {
      const oldParts = parts;
      oldParts.splice(index, 1);
      setParts([...oldParts]);
    }
  }

  const updatePart = function(partIndex, prop, newValue) {
    setParts(parts => {
      return parts.map((part, i) => {
        if(i === partIndex)  {
          const updatedPart = {...part}
          updatedPart[prop] = newValue
          return updatedPart;
        } else {
          return part
        }
      });
    });
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

  const indicateSuccess = function(partName) {
    props.setLoadings(loadings => {
      loadings[partName].success = true;
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

  const destroyExistingSong = async function() {
    
    props.setStatusInfo(statusInfo => statusInfo.setDestroy());

    try {
      await destroySong(
        props.editableSong.id, 
        props.token
      );

      props.setStatusInfo(statusInfo => statusInfo.setSuccess());

    } catch(err) {
      console.log(err);
      props.setStatusInfo(statusInfo => statusInfo.setFailure());
    }
  }
  
  const destroyExistingPart = async function(songId, part) {
    try {
      await destroyPart(songId, part.id, props.token);
      //If the part destroys succesfully, update loadings object
      indicateSuccess(part);

    } catch(err) {
      console.log(err)
    }
  }

  const preparePartData = function(part) {
    part.pitch_order = parts.indexOf(part);
    return part.data();
  }

  const prepareSongData = function() {
    const songData = new FormData();
    songData.append("title", title)
    songData.append("parts_promised", parts.length)
    //Hard-coded as HT choir for now
    songData.append("choir_id", 1)
    return songData;
  }

  const createOrUpdateSong = function(sender) {
    //POST or PATCH the Song
    const songData = prepareSongData();
    const abortControllers = [];
    const songId = (props.editableParts ? props.editableParts.id : null)
    const songController = sender.addSong(songData, songId);
    abortControllers.push(songController);
    props.setAbortControllers([...abortControllers]);
    return sender.sendSong();
  }

  const createOrUpdateParts = function(sender) {
    const abortControllers = [];
    // For each part, prepare the data and send the part,
    // storing the abortController in state, and returning an
    // array of the requests
    const partRequests = parts.reduce((requestArray, part) => {
      const partData = preparePartData(part)
      abortControllers.push(sender.addPart(partData, part.id));
      requestArray.push(sender.sendNextPart());
      return requestArray;
    }, []);

    props.setAbortControllers([...abortControllers]);

    return partRequests
  }

  const submitSong = async function() {
    ///Add a loading object for each part to loadings
    assembleLoadingsObject(parts);
    //If this is a PATCH and there any parts being removed, delete them
    if (props.editableParts) {
      deleteObsoleteParts();
    }

    const sender = SongSender(props.token);

    //Send the song
    try {
      await createOrUpdateSong(sender)
    } catch (err) {
      props.setStatusInfo(statusInfo => statusInfo.setFailure());
      console.log(err);
    }
  
    //After sending the Song, send each of the Song's Parts
    try {
      var partRequests = createOrUpdateParts(sender)
    } catch (err) {
      props.setStatusInfo(statusInfo => statusInfo.setFailure());
      console.log(err);
    }

    partRequests.forEach(async partRequest => {
      indicateSuccess((await partRequest).name);
    })
  }

  const submitValue = function() {
    return (props.statusInfo.factoryMode === "new" ? "Submit Song" : "Update Song")
  }

  const deleteBtn = function() {
    //If we are editing an existing song, display button to delete Song
    if (props.statusInfo.factoryMode === "edit") {
      return (
        <button type="button" className="pseudo-btn" onClick={handleDestroySong}>Delete Song</button>
      )
    }
  }

  const handleDestroySong = function() {
    if(window.confirm("Do you really want to delete this song?")) {
      destroyExistingSong();
    }
  }

  const handleSubmit = function(e) {
    e.preventDefault();
    //set jobStatus to the appropriate delivery status
    props.setStatusInfo(statusInfo => statusInfo.setDelivery());
    submitSong();
  }

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
          required
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