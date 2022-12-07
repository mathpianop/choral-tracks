import styled from "styled-components";
import SongFactory from "./SongFactory";
import TitleBar from "./TitleBar";
import CancelButton from "../general/CancelButton";
import Publisher from "./Publisher";

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
  isOpen,
  openCloseSwitch,
  loadSongs
}) {

  
  const handleClick = function(e) {
    // Filter out child elements from click event
    if (e.target.classList.contains("SongEditor")) {
      openCloseSwitch(song.id)
    }
  }

  const content = function() {
    if (isOpen(song.id)) {
      return <SongFactory song={song} loadSongs={loadSongs} />
    } else {
      return <TitleBar title={song.title} />
    }
  }

  const closeButton = function() {
    if (isOpen(song.id)) {
      return (
        <ButtonWrapper onClick={() => openCloseSwitch(song.id)}>
          <CancelButton />
        </ButtonWrapper>
      );
    }
  }

  const publishButton = function() {
    if (!isOpen(song.id)) {
      return <Publisher song={song} />
    }
  }
  

  return (
    <ListElement className="SongEditor" onClick={handleClick}>
          {closeButton()}
          {content()}
          {publishButton()}
    </ListElement>
  )
}

export default SongEditor;
