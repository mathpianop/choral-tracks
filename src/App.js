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
        location={song.location}
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
    {location: "it_is_truly_meet_3",
    title: "It Is Truly Meet #3",
      parts: ["melody", "tenor", "bass"],
      initials: {
        melody: "M",
        tenor: "T",
        bass: "B"
      },
      id: 1
    }
  ]
  return (
    <div className="App">
      <h1>Holy Transfiguration Choir</h1>
      <p id="overview">
        Welcome to the HT choral resources!
        Hopefully, there will be a lot more to come, but for right now,
        check out the song players below. If you click on one of the titles,
        you can play the song with options to hear your part by itself ("isolate"),
        or with the other parts softer ("emphasize").
      </p>
      {songs.map(song => {
        return songContent(song);
      })}
    </div>
  );
}

export default App;
