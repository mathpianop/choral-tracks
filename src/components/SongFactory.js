import NewSong from "./NewSong.js";
import SubmitProgress from "./SubmitProgress.js"
import { useState, useEffect } from "react";

function SongFactory() {
  const [factoryMode, setFactoryMode] = useState("idle");
  const [loading, setLoading] = useState({});
  const [jobInProgress, setJobInProgress] = useState(false);
 

  const handleNewSong = function() {
    setFactoryMode("draft");
  }

  const content = function() {
    switch (factoryMode) {
      case "draft":
        return (
          <NewSong
            setFactoryMode={setFactoryMode}
            setLoading={setLoading}
            setJobInProgress={setJobInProgress}
          />
        );
      case "submitting":
        return (
          <SubmitProgress 
            loading={loading}
            setJobInProgress={setJobInProgress}
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
    if (!jobInProgress) {
      return <button onClick={handleNewSong}>New</button>
    }
  }

  useEffect(() => {
    //If all parts are loading, mark job as finished
    if (Object.values(loading).every(Boolean)) {
      setJobInProgress(false)
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