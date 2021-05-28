import "./App.css";
import Song from "./components/Song.js"

function App() {
  return (
    <div className="App">
      <Song title="sherburne" parts={["soprano", "alto", "tenor", "bass"]}/>
    </div>
  );
}

export default App;
