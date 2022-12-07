import { useState, useEffect, useContext } from "react";
import publishSong from "../../network/publishSong";
import TokenContext from "../TokenContext";

export default function Publisher({song}) {

  const [publish, setPublish] = useState();
  const token = useContext(TokenContext);

  const handleChange = function(e) {
    console.log(e.target.checked);
    setPublish(e.target.checked);
  }

  const calculatePublish = function() {
    console.log(publish === undefined ? song.publish : publish);
    return publish === undefined ? song.publish : publish
  }

  
  useEffect(() => {
    console.log("publish changed to: ", publish);
    if (publish !== undefined) {
      const abortController = new AbortController();
      console.log(publish);
      const modifyRecord = async function() {
        await publishSong(song.id, publish, token, abortController.signal);
      }
      modifyRecord();
      return () => abortController.abort();
    }
  }, [publish, song.id, token])

  return (
    <input onChange={handleChange} defaultChecked={calculatePublish()} type="checkbox"/>
  )
}