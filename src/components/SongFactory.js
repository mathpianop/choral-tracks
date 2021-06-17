import SongForm from "./SongForm.js";
import SubmitProgress from "./SubmitProgress.js"
import { useState, useEffect } from "react";

function SongFactory(props) {
  
  const [loading, setLoading] = useState({});
  //job status can be: none, assembly, submitting, submitted, or failed
  const [jobStatus, setJobStatus] = useState("none");
 

  const handleNewSong = function() {
    props.setFactoryMode("new");
    setJobStatus("assembly");
  }

  const content = function() {
    switch (props.factoryMode) {
      case "new":
        return (
          <SongForm
            setFactoryMode={props.setFactoryMode}
            setLoading={setLoading}
            setJobStatus={setJobStatus}
            mode="new"
          />
        );
      case "delivery":
        return (
          <SubmitProgress 
            loading={loading}
            setJobStatus={setJobStatus}
            jobStatus={jobStatus}
          />
        );
      case "edit":
        return (
          <SongForm
            setFactoryMode={props.setFactoryMode}
            setLoading={setLoading}
            setJobStatus={setJobStatus}
            mode="edit"
          />
        );
      default:
        return (
          <div className="prompt">
            Add a song or select a song to edit
          </div>
        )
    }
  }

  const button = function() {
    //If a job isn't in progress, show the new song button
    if (jobStatus === "none" || jobStatus === "submitted") {
      return <button onClick={handleNewSong}>New</button>
    }
  }

  useEffect(() => {
    //If all parts are loading, mark job as finished
    if (Object.values(loading).every(Boolean)) {
      setJobStatus("submitted")
    }
    //eslint-disable-next-line
  }, [loading])


  return (
    <div className="SongFactory">
      {content()}
      {button()}
    </div>
  )
}

export default SongFactory;