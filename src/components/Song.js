import { useState } from "react";
import useDynamicRefs from 'use-dynamic-refs';
import PreferenceBtn from "./PreferenceBtn.js";
import Controls from "./Controls.js";


function Song(props) {
  //Set duration to an arbitrarily long amount of time until song loads
  const [duration, setDuration] = useState(10000);
  const [timestamp, setTimestamp] = useState(0);
  const [getRef, setRef] =  useDynamicRefs();

  const applyToAudios = function(audioProperty, param) {
    if (!(param === undefined)) {
      props.parts.forEach(part => getRef(part).current[audioProperty] = param);
    } else {
      props.parts.forEach(part => getRef(part).current[audioProperty]())
    }
  }

  const handleLoad = (e) => setDuration(e.target.duration);
  const handleTimeUpdate = (e) => setTimestamp(e.target.currentTime);
  const playTrack = () => applyToAudios("play");
  const pauseTrack = () => applyToAudios("pause");
  const seekTrack = (timestamp) => applyToAudios("currentTime", timestamp);
  const stopTrack = () => {
    pauseTrack();
    seekTrack(0);
  };
  
  const emphasizePart = function(part) {
    //Set all the parts at a low volume
    applyToAudios("volume", 0.1)
    //Reset part to be emphasized at a high volume
    getRef(part).current.volume = 1;
  }

  const isolatePart = function(part) {
    //Mute all parts
    applyToAudios("volume", 0)
    //Unmute the part to be isolated
    getRef(part).current.volume = 1;
  }

 

  return (
    <div className="Song">
      {props.parts.map((part, index) => {
        if (index === 0) {
          return (
            <audio 
              key={`${props.title}-${part}`}
              ref={setRef(part)}
              //Arbitrarily choose first audio to set duration when loaded
              onLoadedMetadata={handleLoad}
              onTimeUpdate={handleTimeUpdate}>
              <source src={`./tracks/${props.title}/${part}.mp3`} />
            </audio>
          )
        } else {
          return (
            <audio 
              key={`${props.title}-${part}`}
              ref={setRef(part)}
              onTimeUpdate={handleTimeUpdate}>
              <source src={`./tracks/${props.title}/${part}.mp3`} />
            </audio>
          )
        }
      })}
      <Controls
        playTrack={playTrack}
        stopTrack={stopTrack}
        pauseTrack={pauseTrack}
        seekTrack={seekTrack}
        timestamp={timestamp}
        duration={duration}
      />

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
            part={"soprano"} 
            role="isolate" 
            handler={isolatePart}
          />
        )
      })}
    </div>
  )
}

export default Song;