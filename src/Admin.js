import { useState, useEffect } from "react";
import SongFactory from "./components/SongFactory.js";
import CurrentCollection from "./components/CurrentCollection.js"
import { apiUrl } from "./apiUrl.js";

function Admin() {
  const [songs, setSongs] = useState([]);
  const [parts, setParts] = useState([]);
  const [factoryMode, setFactoryMode] = useState("idle");
  //jobStatus can be: none, assembly, creating, created, updating, updated
  //destroyed, destroying, failedToCreate, failedToUpdate, or failedToDestroy
  const [jobStatus, setJobStatus] = useState("none");
  const [editableSong, setEditableSong] = useState(null);
  const [editableParts, setEditableParts] = useState(null);

  const editSong = function(song) {
    setEditableSong(song);
    setEditableParts(parts[song.id.toString()]);
    setFactoryMode("edit");
    setJobStatus("assembly");
  }

  const loadSongs = function() {
    //fetch songs/parts from Rails API
    fetch(`${apiUrl}/admin`)
    .then(response => {
      return response.json();
    })
    .then(songsAndParts => {
      setSongs(songsAndParts.songs);
      setParts(songsAndParts.parts);
    })
    .catch(err => console.log(err))
  }

  //Execute on ComponentDidMount and when the CurrentCollection might changes
  useEffect(() => {
    switch (jobStatus) {
      case "none":
      case "created":
      case "updated":
      case "destroyed":
      case "failedToCreate": //Even in this case, a Song could be partially created
         loadSongs();
        break
      default:
        // Don't reload
    } 
  
  // eslint-disable-next-line 
  }, [jobStatus])
  
  return (
    <div className="Admin">
      <CurrentCollection
        songs={songs}
        parts={parts}
        editSong={editSong}
        jobStatus={jobStatus}
      />
      <SongFactory 
        jobStatus={jobStatus}
        setJobStatus={setJobStatus}
        factoryMode={factoryMode}
        setFactoryMode={setFactoryMode}
        editableSong={editableSong}
        editableParts={editableParts}
      />
    </div>
    
  )
}

export default Admin;