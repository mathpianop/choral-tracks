import { useState, useEffect, useRef } from "react";
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import Preferences from "././Preferences.js"
import Controls from "./Controls.js";
import "../style/Song.css";
import { apiUrl } from "../apiUrl.js";


function Song(props) {
  //Set duration to an arbitrarily long amount of time until song loads
  const [duration, setDuration] = useState(10000);
  const [timestamp, setTimestamp] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [parts, setParts] = useState([])
  const [seekingWhilePlaying, setSeekingWhilePlaying] = useState(false);
  let audioRef = useRef({
    data: {},
    gainNodes: {},
    sourceNodes: {},
    loaded: {}
  });
  const ctxRef = useRef({
    ctx: new (window.AudioContext || window.webkitAudioContext)(),
    time: 0
  })

  const updaterRef = useRef();

  const convertUrlToMp3 = function(url) {
    const splitArray = url.split(".");
    //Replace last element of split array (the current extension)
    //with 'mp3'
    splitArray.splice((splitArray.length - 1), 1, 'mp3')
    return splitArray.join(".");
  }


  const getData = function(part) {
    //Convert extension to .mp3 before fetching from Cloudinary
    const myRequest = new Request(convertUrlToMp3(part.recording));
    return fetch(myRequest)
    .then(response => {
      return response.arrayBuffer();
    })
    .then(buffer => {
        return ctxRef.current.ctx.decodeAudioData(buffer, decodedData => {
          audioRef.current.loaded[part.name] = true
          console.log(part.name, "loaded")
          if (allLoaded()) {setLoading(false)}
          return decodedData;
      });
    })
  }

  const allLoaded = function() {
    //Check if all the parts have been recorded as loaded
    return (Object.values(audioRef.current.loaded).length === parts.length)
  }

  const playData = function(part) {
    audioRef.current.data[part.name].then(decodedData => {
      // Create source node
      const source = ctxRef.current.ctx.createBufferSource();
      // Store the source in the sourcesRef
      audioRef.current.sourceNodes[part.name] = source
      // Wire up the data
      source.buffer = decodedData;
      // Connect the source node to the gain node (which controls the volume)
      source.connect(audioRef.current.gainNodes[part.name]);
      // Connect the gain node to the destination (e.g., speakers) and start the audio
      audioRef.current.gainNodes[part.name].connect(ctxRef.current.ctx.destination);
      source.start(0, timestamp)
    })
  }

  const playTrack = function() {
    if (playing) {
      return
    }
    parts.forEach(part => {
      playData(part);
    });
    //Indicate that play has begun
    setPlaying(true);
  }



  const pauseTrack = function() {
    if (playing) {
      parts.forEach(part => {
        audioRef.current.sourceNodes[part.name].stop();
      });
      //Indicate that playing has stopped
      setPlaying(false);
    }
  }

  const resetTrack = function() {
    pauseTrack();
    setTimestamp(0); 
  }

  const seekTrack = function(newTimestamp) {
    if (playing) {
      setSeekingWhilePlaying(true);
    }
    pauseTrack();
    setTimestamp(newTimestamp);
    //Allow useEffect to restart
  }

  //Execute when seekingWhilePlaying state changes
  useEffect(() => {
    if (seekingWhilePlaying) {
      //Restart the track after seek
      playTrack();
      setSeekingWhilePlaying(false);
    }
    //eslint-disable-next-line
   }, [seekingWhilePlaying]);


   const emphasizePart = function(emphasizedPart) {
    parts.forEach(part => {
      if (part.name === emphasizedPart) {
        //Set part to be emphasized at full volume
        audioRef.current.gainNodes[part.name].gain.value = 1
      } else {
        //Set the rest of the parts at a low volume
        audioRef.current.gainNodes[part.name].gain.value = .1;
      }
    })
  }

  const isolatePart = function(isolatedPart) {
    parts.forEach(part => {
      if (part.name === isolatedPart) {
        //Set part to be isolated at full volume
        audioRef.current.gainNodes[part.name].gain.value = 1
      } else {
        //Mute the rest of the parts
        audioRef.current.gainNodes[part.name].gain.value = 0;
      }
    })
  }

  const fullChoir = function() {
    parts.forEach(part => {
      audioRef.current.gainNodes[part.name].gain.value = 1;
    })
  }

  const createUpdaterInterval = function() {
    return setInterval(() => {
      const timeElapsedSinceLastUpdate = (
        ctxRef.current.ctx.currentTime - ctxRef.current.previousTime
      );
      //Bring the time property up to date with the currentTime
      ctxRef.current.previousTime = ctxRef.current.ctx.currentTime;
      setTimestamp(t => t + timeElapsedSinceLastUpdate);
    }, 250);
  }

  const getCapitalizedPartsString = function() {
    const capitalizedArray = parts.map(part => {
      const partName = part.name;
      return partName.charAt(0) + partName.slice(1);
    })
    return capitalizedArray.join(", ")
   
  }

  //Execute on ComponentDidMount
  useEffect(() => {
    fetch(`${apiUrl}/songs/${props.id}/parts`)
    .then(response => {
      return response.json();
    })
    .then(partsData => {
      setParts(partsData);
    })
  // eslint-disable-next-line
  }, [])

  //Execute once the parts data have loaded
  useEffect(() => {
    if (parts.length > 0) {
      parts.forEach(part => {
        //Load audio for each part
        audioRef.current.data[part.name] = getData(part)
        //Create a gain (volume) node for each part
        audioRef.current.gainNodes[part.name] = ctxRef.current.ctx.createGain();
      });
      //Once loaded, select the first part arbitrarily and set the duration
      Object.values(audioRef.current.data)[0].then(buffer => setDuration(buffer.duration));
    }
  // eslint-disable-next-line
  }, [parts])

  //Execute when playing state changes
  useEffect(() => {
    if (playing) {
      //Before the updater Interval starts, bring the time up to date with the
      //Audio Context's currentTime
      ctxRef.current.previousTime = ctxRef.current.ctx.currentTime;
      updaterRef.current = createUpdaterInterval();
    } else {
      clearInterval(updaterRef.current);
    }
    return () => clearInterval(updaterRef.current);
    // eslint-disable-next-line
  }, [playing])

  //Execute when the timestamp updates
  useEffect(() => {
    //If the timestamp exceeds duration of the track,
    //stop the track and reset the timestamp to 0
    if (timestamp > duration) {
      resetTrack();
    }
    // eslint-disable-next-line
  }, [timestamp])

  const loadingMessage = function() {
    if (loading) {
      return "Loading song (this might take a bit)"
    } else {
      return ""
    }
  }

  return (
      <div className="Song">
        <h2 className="song-title">{props.title}</h2>
        <span className="loading-message">{loadingMessage()}</span>
        <LoadingMask loading={loading}>
          <Controls
            playTrack={playTrack}
            resetTrack={resetTrack}
            pauseTrack={pauseTrack}
            seekTrack={seekTrack}
            timestamp={timestamp}
            duration={duration}
            playing={playing}
          />
          <span className="parts">
            {`Parts: ${getCapitalizedPartsString()}`}
          </span>
          <Preferences 
            parts={parts}
            emphasizePart={emphasizePart}
            isolatePart={isolatePart}
            fullChoir={fullChoir} 
          />
          </LoadingMask>
        
      </div>
  )
}

export default Song;