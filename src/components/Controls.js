import ProgressMeter from "./ProgressMeter.js";

function Controls(props) {

  const playOrPauseBtn = function() {
    if (props.playing) {
      return <button onClick={props.pauseTrack}>Pause</button>
    } else {
      return <button onClick={props.playTrack}>Play</button>
    }
  }
  return (
    <div className="Controls">
      <button onClick={props.resetTrack}>Reset</button>
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