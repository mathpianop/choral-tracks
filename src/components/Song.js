import { useState, useEffect, useRef } from "react";
import PreferenceBtn from "./PreferenceBtn.js";
import Controls from "./Controls.js";


function Song(props) {
  //Set duration to an arbitrarily long amount of time until song loads
  const [duration, setDuration] = useState(10000);
  const [timestamp, setTimestamp] = useState(0);
  const ctxRef = useRef(new (window.AudioContext || window.webkitAudioContext)())
  let sourceNodesRef = useRef({});
  let dataRef = useRef({});
  let gainNodesRef = useRef({});

  const getData = function(url) {
    const myRequest = new Request(url);
    return fetch(myRequest).then(response => {
      return response.arrayBuffer();
    }).then(buffer => {
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
      console.log(duration);
    })
  }


  const playTrack = function() {
    props.parts.forEach(part => {
      playData(part);
    });
  }

  


  const pauseTrack = function() {
    props.parts.forEach(part => {
      sourceNodesRef.current[part].stop();
    })
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

  

  // const handleLoad = (e) => setDuration(e.target.duration);
  // const handleTimeUpdate = (e) => setTimestamp(e.target.currentTime);
  // const playTrack = () => applyToAudios("play");
  // const pauseTrack = () => applyToAudios("pause");
  // const seekTrack = (timestamp) => {
  //   //Pause the audios, seek to the new spot, then resume after waiting 250ms
  //   // to make sure parts remain synchronous
  //   applyToAudios("pause");
  //   applyToAudios("currentTime", timestamp);
  //   setTimeout(() => applyToAudios("play"), 4000);
  // }
  // const stopTrack = () => {
  //   seekTrack(0);
  //   pauseTrack();
    
  // };
  
 
  

  // const resetParts = () => applyToAudios("volume", 0);

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
        // stopTrack={stopTrack}
        pauseTrack={pauseTrack}
        // seekTrack={seekTrack}
        timestamp={timestamp}
        duration={duration}
      />
      <button onClick={resetParts}>Reset Parts</button>
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
      })}
    </div>
  )
}

export default Song;