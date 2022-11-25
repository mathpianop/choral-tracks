import styled from "styled-components";
import SongFactory from "./SongFactory";
import TitleBar from "./TitleBar";
import CancelButton from "../general/CancelButton";

const ListElement = styled.li`
    list-style: none;
    border: 1px solid lightgray;
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 3px;
    background-color: white;
    cursor: pointer;
  `;

const ButtonWrapper = styled.div`
  float: right;
`


function SongEditor({ 
  song, 
  selectedSongId, 
  setSelectedSongId,
  loadSongs
}) {

  const editorIsOpen = () => selectedSongId === song.id;
  const openEditor = () => setSelectedSongId(song.id);
  const closeEditor = () => {
    console.log("closing")
    setSelectedSongId(null)
  };
  
  const handleClick = function(e) {
    // Filter out child elements from click event
    if (e.target.classList.contains("SongEditor")) {
      editorIsOpen() ? closeEditor() : openEditor();
    }
  }

  const content = function() {
    if (editorIsOpen()) {
      return <SongFactory 
                song={song} 
                loadSongs={loadSongs}
              />
    } else {
      return <TitleBar title={song.title} />
    }
  }

  const closeButton = function() {
    if (editorIsOpen()) {
      return (
        <ButtonWrapper onClick={closeEditor}>
          <CancelButton />
        </ButtonWrapper>
      );
    }
  }
  

  return (
    <ListElement className="SongEditor" onClick={handleClick}>
          {closeButton()}
          {content()}
    </ListElement>
  )
}

export default SongEditor;
