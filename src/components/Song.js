import { useState, useEffect, useRef } from "react";
import Preferences from "././Preferences.js"
import Controls from "./Controls.js";
import "../style/Song.css";


function Song(props) {
  //Set duration to an arbitrarily long amount of time until song loads
  const [duration, setDuration] = useState(10000);
  const [timestamp, setTimestamp] = useState(0);
  const [playing, setPlaying] = useState(false);
  let timestampUpdater = useRef();
  let audioRef = useRef({
    data: {},
    gainNodes: {},
    sourceNodes: {}
  });
  const ctxRef = useRef({
    ctx: new (window.AudioContext || window.webkitAudioContext)(),
    startTime: 0
  })

  const capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const getData = function(url) {
    const myRequest = new Request(url);
    return fetch(myRequest)
    .then(response => {
      return response.arrayBuffer();
    })
    .then(buffer => {
        return ctxRef.current.ctx.decodeAudioData(buffer, decodedData => {
        return decodedData;
      });
    });
  }

  const playData = function(part) {
    audioRef.current.data[part].then(decodedData => {
      // Create source node
      const source = ctxRef.current.ctx.createBufferSource();
      // Store the source in the sourcesRef
      audioRef.current.sourceNodes[part] = source
      // Wire up the data
      source.buffer = decodedData;
      // Connect the source node to the gain node (which controls the volume)
      source.connect(audioRef.current.gainNodes[part]);
      // Connect the gain node to the destination (e.g., speakers) and start the audio
      audioRef.current.gainNodes[part].connect(ctxRef.current.ctx.destination);
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
    ctxRef.current.startTime = ctxRef.current.ctx.currentTime
    //Record the starting timestamp
    const startTimeStamp = timestamp;
    //Every 250ms, compare the current Audio Context time
    //to the starting Audio Context time and increase the timestamp by that much
    timestampUpdater.current = setInterval(() => {
      const newTimestamp = (
        (ctxRef.current.ctx.currentTime - ctxRef.current.startTime) + startTimeStamp
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
    if (playing) {
      props.parts.forEach(part => {
        audioRef.current.sourceNodes[part].stop();
      });
      clearInterval(timestampUpdater.current);
      //Indicate that playing has stopped
      setPlaying(false);
    }
  }

  const resetTrack = function() {
    pauseTrack();
    setTimestamp(0); 
  }

  const seekTrack = function(newTimestamp) {
    pauseTrack();
    setTimestamp(newTimestamp);
  }

  

   const emphasizePart = function(emphasizedPart) {
    props.parts.forEach(part => {
      if (part === emphasizedPart) {
        //Set part to be emphasized at full volume
        audioRef.current.gainNodes[part].gain.value = 1
      } else {
        //Set the rest of the parts at a low volume
        audioRef.current.gainNodes[part].gain.value = .2;
      }
    })
  }

  const isolatePart = function(isolatedPart) {
    props.parts.forEach(part => {
      if (part === isolatedPart) {
        //Set part to be isolated at full volume
        audioRef.current.gainNodes[part].gain.value = 1
      } else {
        //Mute the rest of the parts
        audioRef.current.gainNodes[part].gain.value = 0;
      }
    })
  }

  const resetParts = function() {
    props.parts.forEach(part => audioRef.current.gainNodes[part].gain.value = 1);
  }

  //Execute on ComponentDidMount
  useEffect(() => {
    props.parts.forEach(part => {
      //Load audio for each part
      audioRef.current.data[part] = getData(`./tracks/${props.title}/${part}.mp3`)
      //Create a gain (volume) node for each part
      audioRef.current.gainNodes[part] = ctxRef.current.ctx.createGain();
    });
    //Once loaded, select the first part arbitrarily and set the duration
    Object.values(audioRef.current.data)[0].then(buffer => setDuration(buffer.duration));
  // eslint-disable-next-line
  }, [])



  return (
    <div className="Song">
      <h2 className="song-title">{capitalize(props.title)}</h2>
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