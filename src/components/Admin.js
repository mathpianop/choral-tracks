import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SongFactory from "./SongFactory.js";
import CurrentCollection from "./CurrentCollection.js"
import "../style/Admin.css"
import getAdminSongs from "../network/getAdminSongs.js";
import getParts from "../network/getParts.js";
import useShallowMutation from "../helpers/useShallowMutation.js";
import StatusInfo from "../helpers/StatusInfo.js";

function Admin(props) {
  const [songs, setSongs] = useState([]);
  const [statusInfo, setStatusInfo] = useShallowMutation(StatusInfo());
  const [editableSong, setEditableSong] = useState(null);
  const [editableParts, setEditableParts] = useState([]);
  const [abortControllers, setAbortControllers] = useState([]);

  const editSong = async function(song) {
    setEditableSong(song);
    const parts = await getParts(song.id);
    setEditableParts(parts);
    setStatusInfo(statusInfo => {
      statusInfo.factoryMode = "edit";
      statusInfo.jobStatus = "assembly";
    });
  }


  //Execute on ComponentDidMount and when the CurrentCollection might change
  useEffect(() => {
    const loadSongs = async function() {
      const songs = await getAdminSongs(props.choirId, props.token);
      setSongs(songs)
    }
    //If the jobStatus changes and a job isn't in progress, reload the CurrentCollection
    if (!statusInfo.isInProgress() && props.choirId) {
        loadSongs();
    }
    //When Admin unmounts, cancel all of the fetch requests from SongForm
    return () => abortControllers.forEach(controller => controller.abort());
  // eslint-disable-next-line 
  }, [statusInfo, props.adminId])

  return (
    <div className="Admin">
      <Link to=".">
        <button className="nav-btn">Home</button>
      </Link>
      <div className="layout-container">
        <CurrentCollection
          songs={songs}
          editSong={editSong}
          statusInfo={statusInfo}
        />
        <SongFactory 
          statusInfo={statusInfo}
          setStatusInfo={setStatusInfo}
          editableSong={editableSong}
          editableParts={editableParts}
          token={props.token}
          setAbortControllers={setAbortControllers}
        />
      </div>
    </div>
    
  )
}

export default Admin;