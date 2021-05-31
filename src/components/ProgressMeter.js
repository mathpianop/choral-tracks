import {useRef, useState, useEffect} from "react";
import "../style/ProgressMeter.css"

function ProgressMeter(props) {
  
  
  const [progressWidth, setProgressWidth] = useState(0);
  const [meterWidth, setMeterWidth] = useState(0);
  let meterRef = useRef();

  const updateProgress = function() {
    // Set new width of progress bar based on fraction of track completed
    const newProgress = (props.timestamp / props.duration) * meterWidth;
    setProgressWidth(newProgress);
  }

  const handleSeek = function(e) {
    //Seek track to new timestamp based on click position within the meter
    const newTimestamp = (e.clientX / meterWidth) * props.duration;
    props.seekTrack(newTimestamp);
  }

    useEffect(() => {
      //Get the actual width of the progressMeter
      const computedWidth = (
        window.getComputedStyle(meterRef.current).getPropertyValue("width")
      )
      //Get rid of "px" and convert to Integer
      setMeterWidth(parseInt(computedWidth.slice(0, 3)));
    // eslint-disable-next-line
    }, [])

    // eslint-disable-next-line
    useEffect(updateProgress, [props.timestamp])

  
  return (
    <div className="ProgressMeter" ref={meterRef} onClick={handleSeek}>
      <div className="progress-bar" style={{width: progressWidth}}></div>
    </div>
  )
}

export default ProgressMeter;