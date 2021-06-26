import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import Song from "./Song.js";
import SongBtn from "./SongBtn.js";
import {apiUrl} from "../apiUrl.js";
import "../style/Home.css";

function Home() {
  //Store id of selected song
  const [selectedSong, setSelectedSong] = useState(null);
  const [songs, setSongs] = useState([])

  const songContent = function(song) {
    if (song.id === selectedSong) {
      return (
        <Song 
        title={song.title}
        id={song.id}
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
  
  useEffect(() => {
    //On ComponentDidMount, fetch the songs index to create the list index
    fetch(`${apiUrl}/songs`)
    .then(response => {
      return response.json()
    })
    .then(songsData => {
      setSongs(songsData);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <div className="Home">
      <Link to="/admin">
        <button>Admin</button>
      </Link>
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

export default Home;


