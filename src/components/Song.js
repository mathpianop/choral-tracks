import { Howl } from "howler";
import PreferenceBtn from "./PreferenceBtn.js";

function Song(props) {

  const partHowl = function(part) {
    return new Howl({
      src: [
        `./tracks/${props.title}/${part}.m4a`,
        `./tracks/${props.title}/${part}.wav`
      ]
    })
  }

  const howls = {
    soprano: partHowl("soprano"),
    alto: partHowl("alto"),
    tenor: partHowl("tenor"),
    bass: partHowl("bass")
  }
  
  const playTracks = function() {   
    Object.values(howls).forEach(howl => howl.play());
  }

  const stopTracks = function() {
    Object.values(howls).forEach(howl => howl.stop());
  }

  const emphasizePart = function(part) {
    Object.values(howls).forEach(howl => howl.volume(0.1));
    howls[part].volume(1);
  }

  const isolatePart = function(part) {
    Object.values(howls).forEach(howl => howl.volume(0));
    howls[part].volume(1);
  }

  return (
    <div className="Song">
      <button onClick={stopTracks}>Stop</button>
      <button onClick={playTracks}>Play</button>
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