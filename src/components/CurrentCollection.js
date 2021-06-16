import { useEffect, useState } from "react";
import { apiUrl } from "../apiUrl.js";
import SongInfo from "./SongInfo.js";


function CurrentCollection() {
  const [songs, setSongs] = useState([]);
  const [parts, setParts] = useState([])

  const songsContent = function() {
    //If parts have been loaded and set in state, render SongInfo list
    if (Object.keys(parts).length > 0) {
      return songs.map(song => {
        return (
          <SongInfo
            song={song}
            songParts={parts[song.id.toString()]}
            key={song.id}
          />
        )
      })
    }
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
    })
  
   // eslint-disable-next-line 
  }, [])
  return (
    <div className="CurrentSelection">
      {songsContent()}
    </div>
  )
}

export default CurrentCollection;