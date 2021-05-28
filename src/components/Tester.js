import { useEffect } from "react";

function Tester() {
  const testAudio = new Audio("./tracks/sherburne/soprano.m4a");

  const playTest = function() {
    testAudio.play()
  }

  useEffect(() => {
    setInterval(() => {
      console.log(testAudio.paused)
    }, 1000)
    // eslint-disable-next-line
  }, [])

  return (
    <div className="Tester">
      <button onClick={playTest}>Play Test</button>
    </div>
  )
}

export default Tester;