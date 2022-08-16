import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SongFactory from "./SongFactory.js";
import CurrentCollection from "./CurrentCollection.js"
import { apiUrl } from "../apiUrl.js";
import "../style/Admin.css"
import getAdminSongs from "../network/getAdminSongs.js";

function Admin(props) {
  const [songs, setSongs] = useState([]);
  const [factoryMode, setFactoryMode] = useState("idle");
  //jobStatus can be: none, assembly, creating, created, updating, updated
  //destroying, destroyed, failedToCreate, failedToUpdate, or failedToDestroy
  const [jobStatus, setJobStatus] = useState("none");
  const [editableSong, setEditableSong] = useState(null);
  const [abortControllers, setAbortControllers] = useState([]);

  const editSong = function(song) {
    setEditableSong(song);
    setFactoryMode("edit");
    setJobStatus("assembly");
  }

  const loadSongs = async function() {
    try {
      const songs = await getAdminSongs(props.adminId, props.token);
      setSongs(songs)
    } catch(err) {
      console.log(err);
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
      loadSongs();
    }
    //When Admin unmounts, cancel all of the fetch requests from SongForm
    return () => abortControllers.forEach(controller => controller.abort());
  // eslint-disable-next-line 
  }, [jobStatus])

  return (
    <div className="Admin">
      <Link to=".">
        <button className="nav-btn">Home</button>
      </Link>
      <div className="layout-container">
        <CurrentCollection
          songs={songs}
          editSong={editSong}
          jobStatus={jobStatus}
        />
        <SongFactory 
          jobStatus={jobStatus}
          setJobStatus={setJobStatus}
          factoryMode={factoryMode}
          setFactoryMode={setFactoryMode}
          editableSong={editableSong}
          token={props.token}
          setAbortControllers={setAbortControllers}
        />
      </div>
    </div>
    
  )
}

export default Admin;