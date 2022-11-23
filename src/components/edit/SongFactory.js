import SongForm from "./SongForm.js";
import SubmitProgress from "./SubmitProgress.js"
import { useState, useEffect } from "react";
import "../../style/edit/SongFactory.css";
import useShallowMutation from "../../helpers/useShallowMutation";
import StatusInfo from "../../helpers/StatusInfo";
import getParts from "../../network/getParts";


function SongFactory({ song, setAbortControllers, loadSongs, token, closeEditor }) {


  //loadings is an object of loading objects
  //Each loading object has 2 keys, success (Boolean) 
  //, and mode (String: "create", "update", or "destroy")
  const [loadings, setLoadings] = useState({})
  const [statusInfo, setStatusInfo] = useShallowMutation(StatusInfo());
  const [editableParts, setEditableParts] = useState([]);
  const [abortController, setAbortController] = useState(null);
  


  const loadParts = async function() {
    const abortController = new AbortController();
    setAbortController(abortController);
    setEditableParts(await getParts(song.id, abortController.signal))
    setStatusInfo(statusInfo => {
        statusInfo.factoryMode = (song.id === "new" ? "new" : "edit");
        statusInfo.jobStatus = "assembly";
    });
  }

  useEffect(() => {
    if(song.id) {
      loadParts()
    }

    return () => abortController.abort();
    //eslint-disable-next-line
  }, [])

  //If factory results have changed the song list(s), reload songs
  useEffect(() => {
    if (statusInfo.isSuccessful()) {
      loadSongs();
    }
    //eslint-disable-next-line
  }, [statusInfo])

 
  const content = function() {
    switch (statusInfo.factoryMode) {
      //If we are creating or updating a song, render the SongForm
      case "new":
      case "edit":
        return (
          <SongForm
            token={token}
            closeEditor={closeEditor}
            statusInfo={statusInfo}
            setStatusInfo={setStatusInfo}
            setLoadings={setLoadings}
            editableSong={song}
            editableParts={editableParts}
          />
        );
      //If we are submitting the SongForm, or if we are destroying a song,
      //render SubmitProgress
      case "delivery":
      case "destruction":
        return (
          <SubmitProgress 
            loadings={loadings}
            statusInfo={statusInfo}
          />
        );
      default:
        return;
    }
  }

  

  useEffect(() => {
    //If all parts are loading, mark job as finished
    if (Object.values(loadings).every(loading => loading.success) &&
        Object.values(loadings).length > 0) {
        setStatusInfo(statusInfo => statusInfo.setSuccess())
    }
    //eslint-disable-next-line
  }, [loadings]);

  return (
    <div className="SongFactory">
        {content()}
    </div>
  )
}

export default SongFactory;