import "./App.css";
import { useState } from "react"
import Song from "./components/Song.js";
import SongBtn from "./components/SongBtn.js";

function App() {
  //Store id of selected song
  const [selectedSong, setSelectedSong] = useState(null);

  const songContent = function(song) {
    if (song.id === selectedSong) {
      return (
        <Song 
        title={song.title}
        parts={song.parts}
        initials={song.initials}
        key={song.id}
      />
      )
    } else {
      return (
        <SongBtn 
          title={song.title}
          id={song.id}
          setSelectedSong={setSelectedSong}
          key={song.title + song.id}
        />
      )
    }
  }
  const songs = [
    {title: "sherburne",
      parts: ["soprano", "alto", "tenor", "bass"],
      initials: {
        soprano: "S",
        alto: "A",
        tenor: "T",
        bass: "B"
      },
      id: 1
    },
    {title: "sherburne",
      parts: ["soprano", "alto", "tenor", "bass"],
      initials: {
        soprano: "S",
        alto: "A",
        tenor: "T",
        bass: "B"
      },
      id: 2
    }
  ]
  return (
    <div className="App">
      {songs.map(song => {
        return songContent(song);
      })}
    </div>
  );
}

export default App;
