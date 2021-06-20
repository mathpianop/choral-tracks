import { useState, useEffect } from "react";
import SongFactory from "./components/SongFactory.js";
import CurrentCollection from "./components/CurrentCollection.js"
import { apiUrl } from "./apiUrl.js";

function Admin() {

  const [songs, setSongs] = useState([]);
  const [parts, setParts] = useState([]);
  const [factoryMode, setFactoryMode] = useState("idle");
  const [editableSong, setEditableSong] = useState(null);
  const [editableParts, setEditableParts] = useState(null);

  const editSong = function(song) {
    setEditableSong(song);
    setEditableParts(parts[song.id.toString()]);
    setFactoryMode("edit");
  }

  //Execute on ComponentDidMount
  useEffect(() => {
    //fetch songs/parts from Rails API
    fetch(`${apiUrl}/admin-songs`)
    .then(response => {
      return response.json();
    })
    .then(songsAndParts => {
      setSongs(songsAndParts.songs);
      setParts(songsAndParts.parts);
      console.log(songsAndParts.parts["101"])
    })
  
   // eslint-disable-next-line 
  }, [])
  
  return (
    <div className="Admin">
      <CurrentCollection
        songs={songs}
        parts={parts}
        editSong={editSong}
        factoryMode={factoryMode}
      />
      <SongFactory 
        factoryMode={factoryMode}
        setFactoryMode={setFactoryMode}
        editableSong={editableSong}
        editableParts={editableParts}
      />
    </div>
  )
}

export default Admin;