import { useState, useEffect} from "react";



function Tester() {

  const [count, setCount] = useState(0);
  const [countOn, setCountOn] = useState(false);

  const startCount = function() {
    setCountOn(true);
  }

  useEffect(() => {
    if (countOn) {
      setInterval(() => {
        setCount(c => c + 1);
      }, 250)
    }
  }, [countOn])
  
  return (
    <div className="Tester">
      <div className="count">{count}</div>
      <button onClick={startCount}>Start Count</button>
    </div> 
  )
}

export default Tester;