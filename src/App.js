import './App.css';
import { Howl } from "howler";

function App() {
  const sopranoHowl = new Howl({
    src: [
      "./tracks/sherburne/soprano.m4a",
      "./tracks/sherburne/soprano.wav"
    ]
  })

  const altoHowl = new Howl({
    src: [
      "./tracks/sherburne/alto.m4a",
      "./tracks/sherburne/alto.wav"
    ]
  })

  const tenorHowl = new Howl({
    src: [
      "./tracks/sherburne/tenor.m4a",
      "./tracks/sherburne/tenor.wav"
    ]
  })

  const bassHowl = new Howl({
    src: [
      "./tracks/sherburne/bass.m4a",
      "./tracks/sherburne/bass.wav"
    ]
  })


  const howls = {
    soprano: sopranoHowl,
    alto: altoHowl,
    tenor: tenorHowl,
    bass: bassHowl
  }
  
  const playTracks = function() {   
    Object.values(howls).forEach(howl => howl.play());
  }

  const emphasize = function(e) {
    Object.values(howls).forEach(howl => howl.volume(.1));
    howls[e.target.classList[0]].volume(1);
  }

  return (
    <div className="App">
  
      <button onClick={playTracks}>Play</button>
      <button className="soprano" onClick={emphasize}>S</button>
      <button className="alto" onClick={emphasize}>A</button>
      <button className="tenor" onClick={emphasize}>T</button>
      <button className="bass" onClick={emphasize}>B</button>
    </div>
  );
}

export default App;
