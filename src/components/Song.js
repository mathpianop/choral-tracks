import { useState, useEffect } from "react";
import { Howl } from "howler";
import PreferenceBtn from "./PreferenceBtn.js";
import Controls from "./Controls.js";


function Song(props) {
  //Set duration to an arbitrarily long amount of time until song loads
  const [duration, setDuration] = useState(1000000);
  const [timestamp, setTimestamp] = useState(0);
  
  const partHowl = function(part) {
    return new Howl({
      src: [
        `./tracks/${props.title}/${part}.m4a`,
        `./tracks/${props.title}/${part}.wav`
      ]
    })
  }

  const testAudio = new Audio("./tracks/sherburne/soprano.m4a");

  const playTest = function() {
    testAudio.play()
  }

  const howls = {
    soprano: partHowl("soprano"),
    alto: partHowl("alto"),
    tenor: partHowl("tenor"),
    bass: partHowl("bass")
  }


  const applyToHowls = function(howlMethod, param) {
    if (param) {
      Object.values(howls).forEach(howl => howl[howlMethod](param));
    } else {
      Object.values(howls).forEach(howl => howl[howlMethod]());
    }
  }

  const playTrack = () => applyToHowls("play");
  const stopTrack = () => applyToHowls("stop");
  const pauseTrack = () => applyToHowls("pause");
  const seekTrack = (timestamp) => applyToHowls("seek", timestamp);
  

  const emphasizePart = function(part) {
    //Set all the parts at a low volume
    Object.values(howls).forEach(howl => howl.volume(0.1));
    //Reset part to be emphasized at a high volume
    howls[part].volume(1);
  }

  const isolatePart = function(part) {
    //Mute all parts
    Object.values(howls).forEach(howl => howl.volume(0));
    //Unmute the part to be isolated
    howls[part].volume(1);
  }


  

  useEffect(() => {
    //Once one of the files has loaded (arbitrarily chosen to be soprano),
    //set the duration in state
    howls.soprano.on("load", () => {
      setDuration(howls.soprano.duration());
    })

    setInterval(() => {
      // setTimestamp(howls.soprano.seek())
      // console.log(howls.soprano.playing())
      console.log(testAudio.paused)
    }, 1000)
  
  // eslint-disable-next-line
  }, []);

  return (
    <div className="Song">
      <button onClick={playTest}>Play Test</button>
      <Controls
        playTrack={playTrack}
        stopTrack={stopTrack}
        pauseTrack={pauseTrack}
        seekTrack={seekTrack}
        timestamp={timestamp}
        duration={duration}
      />
      <PreferenceBtn 
        part={"soprano"}
        role="emphasize" 
        handler={emphasizePart}
      />
      <PreferenceBtn 
        part={"alto"} 
        role="emphasize" 
        handler={emphasizePart}
      />
      <PreferenceBtn 
        part={"tenor"} 
        role="emphasize" 
        handler={emphasizePart}
      />
      <PreferenceBtn 
        part={"bass"} 
        role="emphasize" 
        handler={emphasizePart}
      />
      <PreferenceBtn 
        part={"soprano"} 
        role="isolate" 
        handler={isolatePart}
      />
      <PreferenceBtn 
        part={"alto"} 
        role="isolate" 
        handler={isolatePart}
      />
      <PreferenceBtn 
        part={"tenor"} 
        role="isolate" 
        handler={isolatePart}
      />
      <PreferenceBtn 
        part={"bass"} 
        role="isolate" 
        handler={isolatePart}
      />
    </div>
  )
}

export default Song;