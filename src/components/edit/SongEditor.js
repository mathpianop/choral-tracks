import styled from "styled-components";
import SongFactory from "./SongFactory";
import TitleBar from "./TitleBar";

const ListElement = styled.li`
    list-style: none;
    border: 1px solid lightgray;
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 3px;
    background-color: white;
    cursor: pointer;
  `;

function SongEditor({ 
  song, 
  selectedSongId, 
  setSelectedSongId, 
  adminId, 
  setAbortControllers,
  loadSongs,
  token
}) {

  const editorIsOpen = () => selectedSongId === song.id;
  const openEditor = () => setSelectedSongId(song.id);
  const closeEditor = () => setSelectedSongId(null);
  
  const handleClick = function(e) {
    if (editorIsOpen() && e.target.classList.contains("SongEditor")) {
      closeEditor();
     } else {
      openEditor();
     }
  }

  const content = function() {
    if (editorIsOpen()) {
      return <SongFactory 
                song={song} 
                adminId={adminId} 
                setAbortControllers={setAbortControllers}
                loadSongs={loadSongs}
                token={token}
                closeEditor={closeEditor}
              />
    } else {
      return <TitleBar title={song.title} />
    }
  }
  

  return (
    <ListElement className="SongEditor" onClick={handleClick}>
          {content()}
    </ListElement>
  )
}

export default SongEditor;
