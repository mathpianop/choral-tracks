import EditSongs from "./EditSongs";
import { useState } from "react";
import ChoirDetails from "./ChoirDetails";
import TabList from "../general/TabList";



export default function EditChoir({ choirId }) {
  //editMode can be "Choir Details" or "Songs"
  const [editMode, setEditMode] = useState("Choir Details");

  const editor = function() {
    if (editMode === "Choir Details") {
      return <ChoirDetails choirId={choirId} />
    } else {
      return <EditSongs choirId={choirId} />
    }
  }

  

  

  return (
    <div id="EditChoir">
      <TabList names={["Choir Details", "Songs"]} onSelect={setEditMode} defaultName="Choir Details"/>
      {editor()}
    </div>
  );


}