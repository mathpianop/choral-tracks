import styled from "styled-components";
import SongFactory from "./SongFactory";
import TitleBar from "./TitleBar";
import CancelButton from "../general/CancelButton";
import Publisher from "./Publisher";
import { useState } from "react";
import PublishStatus from "./PublishStatus";

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

  const [publishing, setPublishing] = useState(false);
  const [publishResponse, setPublishResponse] = useState();

  
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

  const handleClose = function() {
    openCloseSwitch(song.id);
    setPublishResponse();
  }

  const closeButton = function() {
    if (isOpen(song.id)) {
      return (
        <ButtonWrapper onClick={handleClose}>
          <CancelButton />
        </ButtonWrapper>
      );
    }
  }

  const publishStatus = function() {
    if (!isOpen(song.id)) {
        return <PublishStatus 
        setPublishResponse={setPublishResponse}
        publishResponse={publishResponse}
        publishing={publishing}
      />
    }
  }


  const publisher = function() {
    if (!isOpen(song.id)) {
      return <Publisher 
                song={song} 
                setPublishResponse={setPublishResponse} 
                setPublishing={setPublishing}
              />
    }
  }
  

  return (
    <ListElement className="SongEditor" onClick={handleClick}>
          {closeButton()}
          {content()}
          {publishStatus()}
          {publisher()}
    </ListElement>
  )
}

export default SongEditor;
