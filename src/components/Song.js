import { useState, useEffect, useRef } from "react";
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import Preferences from "././Preferences.js"
import Controls from "./Controls.js";
import "../style/Song.css";


function Song(props) {
  //Set duration to an arbitrarily long amount of time until song loads
  const [duration, setDuration] = useState(10000);
  const [timestamp, setTimestamp] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
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
 

  const capitalize = function(string) {
    const substrings = string.split("-");
    //Capitalize Substrings
    const capitalizedSubstrings = substrings.map(substring => {
      return substring.charAt(0).toUpperCase() + substring.slice(1);
    })
    return capitalizedSubstrings.join(" ");
  }


  const getData = function(part) {
    const myRequest = new Request(`./tracks/${props.title}/${part}.mp3`);
    return fetch(myRequest)
    .then(response => {
      return response.arrayBuffer();
    })
    .then(buffer => {
        return ctxRef.current.ctx.decodeAudioData(buffer, decodedData => {
          audioRef.current.loaded[part] = true
          console.log(part, "loaded")
          if (allLoaded()) {setLoading(false)}
          return decodedData;
      });
    });
  }

  const allLoaded = function() {
    //Check if all the parts have been recorded as loaded
    console.log(Object.values(audioRef.current.loaded))
    return (Object.values(audioRef.current.loaded).length === props.parts.length)
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
    })
  }

  const playTrack = function() {
    if (playing) {
      return
    }
    props.parts.forEach(part => {
      playData(part);
    });
    //Indicate that play has begun
    setPlaying(true);
  }



  const pauseTrack = function() {
    if (playing) {
      props.parts.forEach(part => {
        audioRef.current.sourceNodes[part].stop();
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

  const fullChoir = function() {
    props.parts.forEach(part => audioRef.current.gainNodes[part].gain.value = 1);
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

  //Execute on ComponentDidMount
  useEffect(() => {
    props.parts.forEach(part => {
      //Load audio for each part
      audioRef.current.data[part] = getData(part)
      //Create a gain (volume) node for each part
      audioRef.current.gainNodes[part] = ctxRef.current.ctx.createGain();
    });
    //Once loaded, select the first part arbitrarily and set the duration
    Object.values(audioRef.current.data)[0].then(buffer => setDuration(buffer.duration));
  // eslint-disable-next-line
  }, [])

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

  return (
      <div className="Song">
        <h2 className="song-title">{capitalize(props.title)}</h2>
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
          </LoadingMask>
          <Preferences 
            parts={props.parts}
            initials={props.initials}
            emphasizePart={emphasizePart}
            isolatePart={isolatePart}
            fullChoir={fullChoir} 
          />
        
      </div>
  )
}

export default Song;