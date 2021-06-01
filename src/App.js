import "./App.css";
import Song from "./components/Song.js"
import Tester from "./components/Tester.js";
function App() {
  return (
    <div className="App">
      <Song 
        title="sherburne" 
        parts={["soprano", "alto", "tenor", "bass"]}
        initials={{
          soprano: "S",
          alto: "A",
          tenor: "T",
          bass: "B"
        }}
      />
      {/* <Tester /> */}
    </div>
  );
}

export default App;
