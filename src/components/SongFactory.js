import NewSong from "./NewSong.js";
import SubmitProgress from "./SubmitProgress.js"
import SongInfo from "./SongInfo.js"
import { useState, useEffect } from "react";

function SongFactory(props) {
  
  const [loading, setLoading] = useState({});
  //job status can be: none, assembly, submitting, submitted, or failed
  const [jobStatus, setJobStatus] = useState("none");
 

  const handleNewSong = function() {
    props.setFactoryMode("draft");
    setJobStatus("assembly");
  }

  const content = function() {
    switch (props.factoryMode) {
      case "draft":
        return (
          <NewSong
            setFactoryMode={props.setFactoryMode}
            setLoading={setLoading}
            setJobStatus={setJobStatus}
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
        return
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