import EditSongs from "./EditSongs";
import { useEffect, useState } from "react";
import EditChoirDetails from "./EditChoirDetails";
import TabList from "../general/TabList";
import { Link } from "react-router-dom";
import DeleteChoirBtn from "./DeleteChoirBtn";
import ChoirIdContext from "../ChoirIdContext";
import styled from "styled-components";
import CancelButton from "../general/CancelButton";


const NewBanner = styled.div`
  display: flex;
  padding: 5px;
  justify-content: space-between;
`

const NewTitle = styled.h3`
  font-weight: 700;
  font-size: 20px;
`

const ChoirEditor = styled.div`
  width: 500px;
  margin: 10px;
`

export default function EditChoir({ choir, updateChoirs, cancelNewChoir }) {
  //editMode can be "Choir Details" or "Songs"
  const [editMode, setEditMode] = useState("Choir Details");

  
  const loadChoir = () => "c";
  const choirId = () => choir.choir_details.id
  const newChoir = () => choirId() === "new"

  const editor = function() {
    if (editMode === "Choir Details") {
      return choir && <EditChoirDetails updateChoirs={updateChoirs} choirDetails={choir.choir_details}/>
    } else {
      return choir && <EditSongs initialSongs={choir.songs} loadChoir={loadChoir} />
    }
  }

  const tablist = function() {
    if (newChoir()) {
      return
    } else {
      return  <TabList names={["Choir Details", "Songs"]} onSelect={setEditMode} currentName={editMode}/>
    }
  }

  const choirHomeBtn = function() {
    if (!newChoir()) {
      return (
        <Link to={`../choir/${choirId()}`}>
        <button className="nav-btn">Home</button>
        </Link>
    )
    }
  }

  

  const deleteChoirBtn = function() {
    if (!newChoir()) {
      return (
        <DeleteChoirBtn choirId={choirId()} updateChoirs={updateChoirs}/>
      )
    }
  }

  
  const newBanner = function() {
    if(newChoir()) {
      return (
        <NewBanner>
          <NewTitle>New Choir</NewTitle>
          <CancelButton onClick={cancelNewChoir}/>
        </NewBanner>
        )
    }
  }

  useEffect(() => {
    // Ensure that we don't try to display songEditor for a new choir (with no songs)
    console.log(newChoir());
    setEditMode("Choir Details")
    // eslint-disable-next-line
  }, [choir])
  

  return (
    <ChoirIdContext.Provider value={choir.choir_details.id}>
      <ChoirEditor id="EditChoir">
        {newBanner()}
        {choirHomeBtn()}
        {tablist()}
        {editor()}
        {deleteChoirBtn()}
      </ChoirEditor>
    </ChoirIdContext.Provider>
  );


}