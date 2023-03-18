import { useState } from "react";
import SongEditor from "./SongEditor";
import styled from "styled-components";
import removeFromObjectArray from "../../helpers/removeFromObjectArray";
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


function EditSongs({initialSongs, loadChoir}) {

  console.log(initialSongs);

  const initialSelected = function() {
    //If this is a new choir, load component with single blank song opened
    if (initialSongs.length === 0) {
      return "new"
    } else {
      return null
    }
  }

  const [songs, setSongs] = useState(initialSongs);

  const [selectedSongId, setSelectedSongId] = useState(initialSelected);
  

  

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



  

    return (
      <div className="EditSongs">
        <List>
          {songs.map(song => {
            return (
            <SongEditor 
              song={song}  
              key={song.id}
              isOpen={isOpen}
              openCloseSwitch={openCloseSwitch}
              loadSongs={loadChoir}
            />
            )
          })}
          <AddButton onClick={handleAdd}>+</AddButton>
        </List>
      </div>
    )
}

export default EditSongs;