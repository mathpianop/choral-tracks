import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SongEditor from "./SongEditor";
import getEditableSongs from "../../network/getEditableSongs.js";
import styled from "styled-components";

const List = styled.ul`
width: 400px;
padding: 50px;
background-color: rgb(241, 236, 236);
`;
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


function EditSongs({ token, choirId, adminId}) {
  const [songs, setSongs] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [abortController, setAbortController] = useState(null);

 
const loadSongs = async function() {
  const abortController = new AbortController();
  setAbortController(abortController);
  const songs = await getEditableSongs(choirId, token, abortController.signal);
  setSongs(songs);
  setSelectedSongId(null);
}

const handleAdd = function() {
  const newSong = {id: "new"}
  setSelectedSongId("new");
  setSongs(songs => [...songs, newSong]);
}

  //Execute when component mounts
  useEffect(() => {
    loadSongs();
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    
    //If the jobStatus changes and a job isn't in progress, reload the CurrentCollection
    // if (!statusInfo.isInProgress() && choirId) {
    //     loadSongs();
    // }
    //When Admin unmounts, cancel all of the fetch requests from SongForm
    return () => abortController.abort();
  // eslint-disable-next-line 
  }, [])

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
            token={token}
            selectedSongId={selectedSongId}
            setSelectedSongId={setSelectedSongId}
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