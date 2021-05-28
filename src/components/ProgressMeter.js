import {createRef, useState, useEffect} from "react";
import "../style/ProgressMeter.css"

function ProgressMeter(props) {
  
  
  const [progressWidth, setProgressWidth] = useState(0);
  const [width, setWidth] = useState(0);
  let meterRef = createRef();

  const updateProgress = function() {
    const newProgress = (props.timestamp / props.duration) * width;
    setProgressWidth(newProgress);
  }

    useEffect(() => {
      const computedWidth = (
        window.getComputedStyle(meterRef.current).getPropertyValue("width")
      )
      //Get rid of "px" and convert to Integer
      setWidth(parseInt(computedWidth.slice(0, 3)));
    // eslint-disable-next-line
    }, [])

    // eslint-disable-next-line
    useEffect(updateProgress, [props.timestamp])

  
  return (
    <div className="ProgressMeter" ref={meterRef}>
      <div className="progress-bar" style={{width: progressWidth}}></div>
    </div>
  )
}

export default ProgressMeter;