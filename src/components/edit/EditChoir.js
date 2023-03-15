import EditSongs from "./EditSongs";
import { useState } from "react";
import EditChoirDetails from "./EditChoirDetails";
import TabList from "../general/TabList";
import { Link } from "react-router-dom";



export default function EditChoir({ choir, updateChoirs }) {
  //editMode can be "Choir Details" or "Songs"
  const [editMode, setEditMode] = useState("Choir Details");

  

  const loadChoir = () => "c";
  const choirId = () => choir.choir_details.id

  const editor = function() {
    if (editMode === "Choir Details") {
      return choir && <EditChoirDetails updateChoirs={updateChoirs} choirDetails={choir.choir_details}/>
    } else {
      return choir && <EditSongs initialSongs={choir.songs} loadChoir={loadChoir} />
    }
  }

  const tablist = function() {
    if (choirId() === "new") {
      return
    } else {
      return  <TabList names={["Choir Details", "Songs"]} onSelect={setEditMode} defaultName="Choir Details"/>
    }
  }

  const choirHomeBtn = function() {
    if (choir.choir_details.id !== "new") {
      return (
        <Link to={`../choir/${choirId()}`}>
        <button className="nav-btn">Home</button>
        </Link>
    )
    }
  }

  

  

  return (
    <div id="EditChoir">
      {choirHomeBtn()}
      {tablist()}
      {editor()}
    </div>
  );


}