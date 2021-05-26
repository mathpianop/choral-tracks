import './App.css';
import alto from "./tracks/sherburne-alto.m4a"
import tenor from "./tracks/sherburne-tenor.m4a"

function App() {
  const altoAudio = new Audio(alto);
  const tenorAudio = new Audio(tenor);
  
  const playTracks = function() {   
    tenorAudio.play();
    altoAudio.play();
  }

  const emphasizeTenor = function() {
    console.log("Tenor!");
    altoAudio.volume = .2;
  }

  return (
    <div className="App">
  
      <button onClick={playTracks}>Play</button>
      <button className="S">S</button>
      <button className="A">A</button>
      <button className="T" onClick={emphasizeTenor}>T</button>
      <button className="B">B</button>
    </div>
  );
}

export default App;
