import ProgressMeter from "./ProgressMeter.js";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import ResetIcon from "@material-ui/icons/Replay";

function Controls(props) {

  const playOrPauseBtn = function() {
    if (props.playing) {
      return (
      <button onClick={props.pauseTrack}>
        <PauseIcon />
      </button>
      )
    } else {
      return (
      <button onClick={props.playTrack}>
        <PlayIcon />
      </button>
      )
    }
  }
  return (
    <div className="Controls">
      <button onClick={props.resetTrack}>
        <ResetIcon />
      </button>
      {playOrPauseBtn()}
      <ProgressMeter 
        seekTrack={props.seekTrack} 
        duration={props.duration}
        timestamp={props.timestamp}
      />
    </div>
  )
}

export default Controls;