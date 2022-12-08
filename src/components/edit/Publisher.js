import { useState, useEffect, useContext } from "react";
import publishSong from "../../network/publishSong";
import TokenContext from "../TokenContext";

export default function Publisher({song, setPublishResponse, setPublishing}) {

  const [publish, setPublish] = useState();
  const token = useContext(TokenContext);

  const handleChange = function(e) {
    setPublish(e.target.checked);
  }

  const calculatePublish = function() {
    console.log(publish === undefined ? song.publish : publish);
    return publish === undefined ? song.publish : publish
  }

  
  useEffect(() => {
    if (publish !== undefined) {
      const abortController = new AbortController();
      const modifyRecord = async function() {
        setPublishing(true);
        const publishResponse = await publishSong(song.id, publish, token, abortController.signal);
        setPublishing(false);
        setPublishResponse(publishResponse);
      }
      modifyRecord();
      return () => abortController.abort();
    }
  // eslint-disable-next-line
  }, [publish, song.id, token])

  return (
    <input onChange={handleChange} defaultChecked={calculatePublish()} type="checkbox"/>
  )
}