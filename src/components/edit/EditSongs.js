import { useState, useEffect, useContext } from "react";
import TokenContext from "../TokenContext";
import { Link } from "react-router-dom";
import SongEditor from "./SongEditor";
import getEditableSongs from "../../network/getEditableSongs.js";
import styled from "styled-components";
import removeFromObjectArray from "../../helpers/removeFromObjectArray";
import { useErrorHandler } from "react-error-boundary";
import { List } from "../../style/general/list";

const AddButton = styled.li`
  list-style: none;
  border: 1px solid lightgray;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 3px;
  background-color: white;
  width: 15px;
  float: right;
  cursor: pointer;
  `;


function EditSongs({ choirId}) {
  
  const [songs, setSongs] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState(null);
  const handleError = useErrorHandler();
  const token = useContext(TokenContext);

  const loadSongs = async function(abortController) {
    let songs;
    try {
      songs = await getEditableSongs(choirId, token, abortController.signal);
      setSongs(songs);
      setSelectedSongId(null);
    } catch (e) {
      handleError(e);
    }

    
    
  }

  const handleAdd = function() {
    const newSong = {id: "new"}
    setSelectedSongId("new");
    setSongs(songs => [...songs, newSong]);
  }

  const closeEditor = () => setSelectedSongId(null);
  const openEditor = id => setSelectedSongId(id);
  const isOpen = (songId) => selectedSongId === songId;

  const openCloseSwitch = function(songId) {
    // If open editor is a new draft, remove from the songs list
    if (selectedSongId === "new") {
      setSongs(songs => removeFromObjectArray(songs, songId, "new"))
    }

    isOpen(songId) ? closeEditor() : openEditor(songId);
  }



  //Execute when component mounts
  useEffect(() => {
    const abortController = new AbortController();
    loadSongs(abortController);
    return () => abortController.abort();
    // eslint-disable-next-line
  }, []);

  //Remove unsubmitted songs when they are closed

    return (
      <div className="EditSongs">
        <Link to=".">
          <button className="nav-btn">Home</button>
        </Link>
        <List>
          {songs.map(song => {
            return (
            <SongEditor 
              song={song}  
              key={song.id}
              isOpen={isOpen}
              openCloseSwitch={openCloseSwitch}
              loadSongs={loadSongs}
            />
            )
          })}
          <AddButton onClick={handleAdd}>+</AddButton>
        </List>
      </div>
    )
}

export default EditSongs;