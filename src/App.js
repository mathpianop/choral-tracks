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
    },
    {location: "ascension-megalonarion",
    title: "Ascension Megalonarion",
    parts: ["soprano", "alto", "tenor", "bass"],
    initials: {
      soprano: "S",
      alto: "A",
      tenor: "T",
      bass: "B"
      },
    id: 2 
    },
    {location: "for-all-the-saints",
    title: "For All The Saints",
    parts: ["women", "men"],
    initials: {
      women: "W",
      men: "M"
      },
    id: 3 
    }

  ]
  return (
    <div className="App">
      <h1>Holy Transfiguration Choir</h1>
      <section id="overview">
        <p >
          Welcome to the HT choral resources!
          Hopefully, there will be a lot more to come, but for right now,
          check out the song player below. If you click on one of the titles,
          you can play the song with options to hear your part by itself ("isolate"),
          or with the other parts softer ("emphasize").
        </p>
        <p id="disclaimer">
          NB: &ensp; This player ain't gonna work on a mobile device. &nbsp;
          Also, you may find that you get the best experience using headphones,
          especially when selecting "emphasize".
        </p>
      </section>
      
      {songs.map(song => {
        return songContent(song);
      })}
    </div>
  );
}

export default App;
