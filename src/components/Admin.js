import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SongFactory from "./SongFactory.js";
import CurrentCollection from "./CurrentCollection.js"
import { apiUrl } from "../apiUrl.js";
import "../style/Admin.css"

function Admin(props) {
  const [songs, setSongs] = useState([]);
  const [parts, setParts] = useState([]);
  const [factoryMode, setFactoryMode] = useState("idle");
  //jobStatus can be: none, assembly, creating, created, updating, updated
  //destroying, destroyed, failedToCreate, failedToUpdate, or failedToDestroy
  const [jobStatus, setJobStatus] = useState("none");
  const [editableSong, setEditableSong] = useState(null);
  const [editableParts, setEditableParts] = useState(null);
  const [cancelSources, setCancelSources] = useState([]);

  const editSong = function(song) {
    setEditableSong(song);
    setEditableParts(parts[song.id.toString()]);
    setFactoryMode("edit");
    setJobStatus("assembly");
  }

  const loadSongs = async function(abortControllerSignal) {
    //fetch songs/parts from Rails API
    try {
      const response = await fetch(`${apiUrl}/admin`, {
        headers: { Authorization: `Bearer ${props.token}` },
        signal: abortControllerSignal
      })
      const songsAndParts = await response.json();
      setSongs(songsAndParts.songs);
      setParts(songsAndParts.parts);
    } catch(err) {
      if (!abortControllerSignal.aborted) {
        console.log(err)
      }
    }
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
      const abortController = new AbortController()
      loadSongs(abortController.signal);
      return () => abortController.abort();
    }
    //When Admin unmounts, cancel all of the Axios requests from SongForm
    return () => cancelSources.forEach(source => source.cancel())
  // eslint-disable-next-line 
  }, [jobStatus])

  return (
    <div className="Admin">
      <Link to="/">
        <button className="nav-btn">Home</button>
      </Link>
      <div className="layout-container">
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
          setCancelSources={setCancelSources}
        />
      </div>
    </div>
    
  )
}

export default Admin;