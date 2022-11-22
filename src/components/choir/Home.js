import { useState } from "react"
import { Link } from "react-router-dom";
import SongPlayer from "./SongPlayer.js";
import SongBtn from "./SongBtn.js";
import { AudioContext } from 'standardized-audio-context';
import stripTrailingSlash from "../../helpers/stripTrailingSlash.js";


function Home(props) {
  //Store id of selected song
  const [selectedSong, setSelectedSong] = useState(null);

  const [audioContext] = useState(new AudioContext());

  const songContent = function(song) {
    if (song.id === selectedSong) {
      return (
        <SongPlayer 
        title={song.title}
        id={song.id}
        key={song.id}
        audioContext={audioContext}
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

  
  const songPlayers = function() {
    if (props.songs) {
      return props.songs.map(song => {
        return songContent(song);
      })
    }
  }
  
  return (
    <div className="Home">
      <Link to={`${stripTrailingSlash(props.match.url)}/admin`}>
        <button className="nav-btn">Admin</button>
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
          NB: &ensp; This player may not work on a mobile device. &nbsp;
          Also, you may find that you get the best experience using headphones,
          especially when selecting "emphasize".
        </p>
      </section>

      {songPlayers()}
    </div>
  );
}

export default Home;


