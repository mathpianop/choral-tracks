import SongForm from "./SongForm.js";
import SubmitProgress from "./SubmitProgress.js"
import { useState, useEffect } from "react";
import "../style/SongFactory.css";

function SongFactory(props) {
  //loadings is an object of loading objects
  //Each loading object has 2 keys, success (Boolean) 
  //, and mode (String: "create", "update", or "destroy")
  const [loadings, setLoadings] = useState({})
 
  const handleNewSong = function() {
    props.setStatusInfo(statusInfo => {
      statusInfo.jobStatus = "assembly";
      statusInfo.factoryMode = "new";
    })
  }

 
  const content = function() {
    switch (props.statusInfo.factoryMode) {
      //If we are creating or updating a song, render the SongForm
      case "new":
        return (
          <SongForm
            token={props.token}
            statusInfo={props.statusInfo}
            setStatusInfo={props.setStatusInfo}
            setLoadings={setLoadings}
            loadings={loadings}
            setAbortControllers={props.setAbortControllers}
          />
        );
      case "edit":
        return (
          <SongForm
            token={props.token}
            statusInfo={props.statusInfo}
            setStatusInfo={props.setStatusInfo}
            setLoadings={setLoadings}
            loadings={loadings}
            editableSong={props.editableSong}
            editableParts={props.editableParts}
            setAbortControllers={props.setAbortControllers}
          />
        );
      //If we are submitting the SongForm, or if we are destroying a song,
      //render SubmitProgress
      case "delivery":
      case "destruction":
        return (
          <SubmitProgress 
            loadings={loadings}
            statusInfo={props.statusInfo}
          />
        );
      default:
        return (
          <span className="prompt">
            Create a song or select one to edit
          </span>
        )
    }
  }

  const button = function() {
    //If a job isn't in progress, show the new song button
    console.log(props.statusInfo.jobStatus, props.statusInfo.isInProgress(), props.statusInfo.factoryMode);
    if (!props.statusInfo.isInProgress()) {
      return (
        <button 
          className="pseudo-btn" 
          id="new-song-btn" 
          onClick={handleNewSong}
        >
          New Song
        </button>
      )
    }
  }

  useEffect(() => {
    //If all parts are loading, mark job as finished
    if (Object.values(loadings).every(loading => loading.success) &&
        Object.values(loadings).length > 0) {
        props.setStatusInfo(statusInfo => statusInfo.setSuccess())
    }
    //eslint-disable-next-line
  }, [loadings]);

  return (
    <div className="SongFactory">
      <div className="central-container">
        {button()}
        {content()}
      </div>
    </div>
  )
}

export default SongFactory;