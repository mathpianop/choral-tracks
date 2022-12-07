import { useState, useEffect, useContext } from "react";
import publishSong from "../../network/publishSong";
import TokenContext from "../TokenContext";

export default function Publisher({
  song
}) {
  const [publish, setPublish] = useState();
  const token = useContext(TokenContext);

  const handleChange = function(e) {
    setPublish(e.target.checked);
  }

  const calculatePublish = function() {
    return publish || song.publish
  }

  
  useEffect(() => {
    if (publish) {
      const abortController = new AbortController();
      const modifyRecord = async function() {
        await publishSong(song.id, publish, token, abortController.signal);
      }
      modifyRecord();
      return () => abortController.abort();
    }
  }, [publish, song.id, token])

  return (
    <input onChange={handleChange} checked={calculatePublish()} type="checkbox"/>
  )
}