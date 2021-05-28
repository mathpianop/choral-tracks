import ProgressMeter from "./ProgressMeter.js";

function Controls(props) {
  return (
    <div className="Controls">
      <button onClick={props.stopTrack}>Stop</button>
      <button onClick={props.playTrack}>Play</button>
      <ProgressMeter 
        seekTrack={props.seekTrack} 
        duration={props.duration}
        timestamp={props.timestamp}
      />
    </div>
  )
}

export default Controls;