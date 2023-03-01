import EditSongs from "./EditSongs";
import { useState, useEffect } from "react";
import EditChoirDetails from "./EditChoirDetails";
import TabList from "../general/TabList";
import getEditableChoir from "../../network/getEditableChoir";
import { useErrorHandler } from "react-error-boundary";
import { useContext } from "react";
import TokenContext from "../TokenContext";
import { Link } from "react-router-dom";



export default function EditChoir({ choirId, providedChoir }) {
  //editMode can be "Choir Details" or "Songs"
  const [editMode, setEditMode] = useState("Choir Details");
  const [choir, setChoir] = useState();
  const handleError = useErrorHandler();
  const token = useContext(TokenContext);

  const loadChoir = async function(abortController) {
    if (providedChoir) {
      setChoir(providedChoir)
    } else {
      let choir;
      try {
        choir = await getEditableChoir(choirId, token, abortController.signal);
        setChoir(choir);
      } catch (e) {
        handleError(e);
      }
    }
  }

  const editor = function() {
    if (editMode === "Choir Details") {
      console.log(choir);
      return choir && <EditChoirDetails choirDetails={choir.choir_details} choirId={choirId}/>
    } else {
      return choir && <EditSongs initialSongs={choir.songs} loadChoir={loadChoir} />
    }
  }

  const tablist = function() {
    console.log(choirId)
    if (choirId === "new") {
      return
    } else {
      return  <TabList names={["Choir Details", "Songs"]} onSelect={setEditMode} defaultName="Choir Details"/>
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
      <Link to={`../choir/${choirId}`}>
          <button className="nav-btn">Home</button>
        </Link>
      {tablist()}
      {editor()}
    </div>
  );


}