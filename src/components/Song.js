//

import { useState, useEffect, useRef } from "react";
import Preferences from "././Preferences.js"
import Controls from "./Controls.js";


function Song(props) {
  //Set duration to an arbitrarily long amount of time until song loads
  const [duration, setDuration] = useState(10000);
  const [timestamp, setTimestamp] = useState(0);
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef(new (window.AudioContext || window.webkitAudioContext)())
  let audioRef = useRef({
    data: {},
    gainNodes: {},
    sourceNodes: {}
  });
  let sourceNodesRef = useRef({});
  let dataRef = useRef({});
  let gainNodesRef = useRef({});
  let timestampUpdater = useRef();
  let startCtxTimeRef = useRef(0);

  const getData = function(url) {
    const myRequest = new Request(url);
    return fetch(myRequest)
    .then(response => {
      return response.arrayBuffer();
    })
    .then(buffer => {
        return ctxRef.current.decodeAudioData(buffer, decodedData => {
        return decodedData;
      });
    });
  }

  const playData = function(part) {
    dataRef.current[part].then(decodedData => {
      // Create source node
      const source = ctxRef.current.createBufferSource();
      // Store the source in the sourcesRef
      sourceNodesRef.current[part] = source
      // Wire up the data
      source.buffer = decodedData;
      // Connect the source node to the gain node (which controls the volume)
      source.connect(gainNodesRef.current[part]);
      // Connect the gain node to the destination (e.g., speakers) and start the audio
      gainNodesRef.current[part].connect(ctxRef.current.destination);
      source.start(0, timestamp)
      source.onended = () => clearInterval(timestampUpdater.current);
    })
  }

  const playTrack = function() {
    if (playing) {
      return
    }

    props.parts.forEach(part => {
      playData(part);
    });

    //Record the start time according to the Audio Context
    startCtxTimeRef.current = ctxRef.current.currentTime
    //Record the starting timestamp
    const startTimeStamp = timestamp;
    //Every 250ms, compare the current Audio Context time
    //to the starting Audio Context time and increase the timestamp by that much
    timestampUpdater.current = setInterval(() => {
      const newTimestamp = (
        (ctxRef.current.currentTime - startCtxTimeRef.current) + startTimeStamp
      );
      //If the timestamp gets within 300ms of the end of the track,
      //stop the track and reset the timestamp to 0
      if ((duration - newTimestamp) < .3) {
        pauseTrack();
        setTimestamp(0);
      } else {
        setTimestamp(newTimestamp);
      }
    }, 250);
    //Indicate that play has begun
    setPlaying(true);
  }



  const pauseTrack = function() {
    props.parts.forEach(part => {
      sourceNodesRef.current[part].stop();
    });
    clearInterval(timestampUpdater.current);
    //Indicate that playing has stopped
    setPlaying(false);
  }

  const resetTrack = function() {
    pauseTrack();
    setTimestamp(0); 
  }

  const seekTrack = function(newTimestamp) {
    if (playing) {
      pauseTrack();
    }
    setTimestamp(newTimestamp);
  }

  

   const emphasizePart = function(emphasizedPart) {
    props.parts.forEach(part => {
      if (part === emphasizedPart) {
        //Set part to be emphasized at full volume
        gainNodesRef.current[part].gain.value = 1
      } else {
        //Set the rest of the parts at a low volume
        gainNodesRef.current[part].gain.value = .1;
      }
    })
  }

  const isolatePart = function(isolatedPart) {
    props.parts.forEach(part => {
      if (part === isolatedPart) {
        //Set part to be isolated at full volume
        gainNodesRef.current[part].gain.value = 1
      } else {
        //Mute the rest of the parts
        gainNodesRef.current[part].gain.value = 0;
      }
    })
  }

  const resetParts = function() {
    props.parts.forEach(part => gainNodesRef.current[part].gain.value = 1);
  }

  useEffect(() => {
    //Execute on ComponentDidMount
    props.parts.forEach(part => {
      //Load audio for each part
      dataRef.current[part] = getData(`./tracks/${props.title}/${part}.mp3`)
      //Create a gain (volume) node for each part
      gainNodesRef.current[part] = ctxRef.current.createGain();
    });
    //Once loaded, select the first part arbitrarily and set the duration
    Object.values(dataRef.current)[0].then(buffer => setDuration(buffer.duration));
  // eslint-disable-next-line
  }, [])

  return (
    <div className="Song">
      <Controls
        playTrack={playTrack}
        resetTrack={resetTrack}
        pauseTrack={pauseTrack}
        seekTrack={seekTrack}
        timestamp={timestamp}
        duration={duration}
        playing={playing}
      />
      <Preferences 
        parts={props.parts}
        emphasizePart={emphasizePart}
        isolatePart={isolatePart}
        resetParts={resetParts} 
      />
      {/* <button onClick={resetParts}>Reset Parts</button>
      {props.parts.map(part => {
        return(
          <PreferenceBtn 
          key={`emphasize-${part}`}
          part={part}
          role="emphasize" 
          handler={emphasizePart}
          />
        )
      })}     
      {props.parts.map(part => {
        return (
          <PreferenceBtn 
            key={`isolate-${part}`}
            part={part} 
            role="isolate" 
            handler={isolatePart}
          />
        )
      })} */}
    </div>
  )
}

export default Song;