import NewSong from "./NewSong.js";
import SubmitProgress from "./SubmitProgress.js"
import { useState } from "react";

function SongFactory() {
  const [factoryMode, setFactoryMode] = useState("draft");
  const [loading, setLoading] = useState({});

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
          />
        );
      case "submitting":
        return (
          <SubmitProgress 
            loading={loading}
          />
        );
      default:
        return <button onClick={handleNewSong}>Add New Song</button>
    }
  }

  return (
    <div className="SongFactory">
      {content()}
    </div>
  )
}

export default SongFactory;