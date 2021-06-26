import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SongFactory from "./SongFactory.js";
import CurrentCollection from "./CurrentCollection.js"
import { apiUrl } from "../apiUrl.js";

function Admin(props) {
  const [songs, setSongs] = useState([]);
  const [parts, setParts] = useState([]);
  const [factoryMode, setFactoryMode] = useState("idle");
  //jobStatus can be: none, assembly, creating, created, updating, updated
  //destroying, destroyed, failedToCreate, failedToUpdate, or failedToDestroy
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
    fetch(`${apiUrl}/admin`, {
      headers: { Authorization: `Bearer ${props.token}` }
    })
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
    //If the jobStatus changes and a job isn't in progress, reload the CurrentCollection
    if (
      !(jobStatus === "assembly") &&
      !(jobStatus === "creating") &&
      !(jobStatus === "updating") &&
      !(jobStatus === "destroying") 
      ) {
      loadSongs();
    }

  // eslint-disable-next-line 
  }, [jobStatus])

  return (
    <div className="Admin">
      <Link to="/">
        <button>Home</button>
      </Link>
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
        token={props.token}
      />
    </div>
    
  )
}

export default Admin;