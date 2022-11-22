import ProgressMeter from "./ProgressMeter.js";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import PauseIcon from "@material-ui/icons/PauseRounded";
import ResetIcon from "@material-ui/icons/ReplayRounded";
import "../../style/choir/Controls.css";

function Controls(props) {
  const handleKeyUp = function(e) {
    if (e.keyCode === 32) {
      props.pauseTrack();
    }
  }

  const playOrPauseBtn = function() {
    if (props.playing) {
      return (
      <button 
        className="control-btn" 
        onClick={props.pauseTrack}
        onKeyUp={handleKeyUp}
      >
        <PauseIcon />
      </button>
      )
    } else {
      return (
      <button 
        className="control-btn" 
        onClick={props.playTrack}
      >
        <PlayIcon />
      </button>
      )
    }
  }

  return (
    <div className="Controls">
      <button className="control-btn" onClick={props.resetTrack}>
        <ResetIcon />
      </button>
      {playOrPauseBtn()}
      <div className="progress-meter-container">
        <ProgressMeter 
          seekTrack={props.seekTrack} 
          duration={props.duration}
          timestamp={props.timestamp}
        />
      </div>
    </div>
  )
}

export default Controls;