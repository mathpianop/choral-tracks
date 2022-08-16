import SongForm from "./SongForm.js";
import SubmitProgress from "./SubmitProgress.js"
import { useState, useEffect } from "react";
import "../style/SongFactory.css";

function SongFactory(props) {
  //loadings is an object of loading objects
  //Each loading object has 2 keys, success (Boolean) 
  //, and mode (String: "create", "update", or "destroy")
  const [loadings, setLoadings] = useState({});
 
  const handleNewSong = function() {
    props.setFactoryMode("new");
    props.setJobStatus("assembly");
  }

  const content = function() {
    switch (props.factoryMode) {
      //If we are creating or updating a song, render the SongForm
      case "new":
        return (
          <SongForm
            token={props.token}
            setFactoryMode={props.setFactoryMode}
            setLoadings={setLoadings}
            setJobStatus={props.setJobStatus}
            jobStatus={props.jobStatus}   
            factoryMode="new"
            setAbortControllers={props.setAbortControllers}
          />
        );
      case "edit":
        return (
          <SongForm
            token={props.token}
            setFactoryMode={props.setFactoryMode}
            setLoadings={setLoadings}
            setJobStatus={props.setJobStatus}
            jobStatus={props.jobStatus}
            editableSong={props.editableSong}
            editableParts={props.editableParts}
            factoryMode="edit"
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
            setJobStatus={props.setJobStatus}
            jobStatus={props.jobStatus}
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
    if (
      !(props.jobStatus === "assembly") &&
      !(props.jobStatus === "creating") &&
      !(props.jobStatus === "updating") &&
      !(props.jobStatus === "destroying") 
      ) {
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
    if (Object.values(loadings).every(loading => loading.success)) {
      if (props.jobStatus === "creating") {
        props.setJobStatus("created");
        props.setFactoryMode("idle");
      } else if (props.jobStatus === "updating") {
        props.setJobStatus("updated");
        props.setFactoryMode("idle");
      }
    }
    //eslint-disable-next-line
  }, [loadings])


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