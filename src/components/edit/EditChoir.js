import EditSongs from "./EditSongs";
import { useState, useEffect } from "react";
import ChoirDetails from "./ChoirDetails";
import TabList from "../general/TabList";
import getEditableChoir from "../../network/getEditableChoir";
import { useErrorHandler } from "react-error-boundary";
import { useContext } from "react";
import TokenContext from "../TokenContext";



export default function EditChoir({ choirId }) {
  //editMode can be "Choir Details" or "Songs"
  const [editMode, setEditMode] = useState("Choir Details");
  const [choir, setChoir] = useState({songs: [], choir_details: {}});
  const handleError = useErrorHandler();
  const token = useContext(TokenContext);

  const loadChoir = async function(abortController) {
    let choir;
    try {
      choir = await getEditableChoir(choirId, token, abortController.signal);
      console.log("But Here". choir);
      setChoir(choir);
    } catch (e) {
      handleError(e);
    }
  }

  const editor = function() {
    if (editMode === "Choir Details") {
      console.log("Hi", choir);
      return <ChoirDetails choirDetails={choir.choir_details}/>
    } else {
      return <EditSongs initialSongs={choir.songs} loadChoir={loadChoir} />
    }
  }

  
//Execute when component mounts
  useEffect(() => {
    const abortController = new AbortController();
    loadChoir(abortController);
    return () => abortController.abort();
    // eslint-disable-next-line
  }, []);
  

  return (
    <div id="EditChoir">
      <TabList names={["Choir Details", "Songs"]} onSelect={setEditMode} defaultName="Choir Details"/>
      {editor()}
    </div>
  );


}