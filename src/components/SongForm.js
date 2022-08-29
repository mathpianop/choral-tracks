import PartFormlet from "./PartFormlet.js"
import getParts from "../network/getParts";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import "../style/SongForm.css";
import destroySong from "../network/destroySong.js";
import destroyPart from "../network/destroyPart.js";
import SongSender from "../network/SongSender.js";

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
        if (initialParts[i] && i === initialParts[i]["pitch_order"]) {
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
        loadings[part.name] = {success: false, mode: part.mode, progressEvent: {}}
      });
      return {...loadings}
    });
  }

  const indicateSuccess = function(part) {
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



  const destroyExistingSong = async function() {
    props.setFactoryMode("destruction");

    try {
      await destroySong(
        props.editableSong.id, 
        props.token
      );

      props.setJobStatus("destroyed");
      props.setFactoryMode("idle");
    } catch(err) {
      props.setJobStatus("failedToDestroy");
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
    const partData = new FormData();
    partData.append("name", part.name);
    partData.append("initial", part.initial);
    partData.append("recording", part.recording);
    partData.append("pitch_order", parts.indexOf(part))
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
    const songController = sender.addSong(songData, props.editableSong.id);
    abortControllers.push(songController);
    props.setAbortControllers([...abortControllers]);
    return sender.sendSong();
  }

  const createOrUpdateParts = function(sender) {
    const abortControllers = [];
    parts.forEach((part) => {
      const partData = preparePartData(part)
      abortControllers.push(sender.addPart(partData, part.id));
      sender.sendNextPart();
    });

    props.setAbortControllers([...abortControllers]);
  }

  const submitSong = async function() {
    ///Add a loading object for each part to loadings
    assembleLoadingsObject(parts)
    //If this is a PATCH and there any parts being removed, delete them
    if (props.editableParts) {
      deleteObsoleteParts();
    }
    props.setFactoryMode("delivery");

    const sender = SongSender(props.token);

    try {
      await createOrUpdateSong()
    } catch (err) {
      if (props.jobStatus === "creating") {
        props.setJobStatus("failedToCreate");
      } else if (props.jobStatus === "updating") {
        props.setJobStatus("failedToUpdate");
      }
      console.log(err);
    }
  
    //After sending the Song, send each of the Song's Parts
    try {
      createOrUpdateParts(sender)
    } catch (err) {
      if (props.factoryMode === "new") {
        props.setJobStatus("failedToCreate");
     } else if (props.factoryMode === "edit") {
       props.setJobStatus("failedToUpdate");
     }
    }
  }

  const submitValue = function() 
  {
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

  const loadParts = async function() {
    const parts = await getParts(props.editableSong);
    setParts(parts);
  }

  useEffect(() => {
    if (props.factoryMode === "edit") {
      loadParts();
    }
     //eslint-disable-next-line
  }, [props.factoryMode]);

  useEffect(() => {
    if (props.jobStatus === "creating" || props.jobStatus === "updating") {
      submitSong()
    } else if (props.jobStatus === "destroying") {
      destroyExistingSong();
    }
    //eslint-disable-next-line
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