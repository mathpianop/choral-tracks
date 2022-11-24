import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import SongPlayer from "./SongPlayer.js";
import SongBtn from "./SongBtn.js";
import { AudioContext } from 'standardized-audio-context';
import stripTrailingSlash from "../../helpers/stripTrailingSlash.js";
import ChoirIdContext from "../ChoirIdContext.js";
import getChoir from "../../network/getChoir.js";

function Home(props) {
  //Store id of selected song
  const [choir, setChoir] = useState({})
  const [selectedSong, setSelectedSong] = useState(null);
  const [audioContext] = useState(new AudioContext());

  const loadChoir = async function() {
    try {
      const choirData = await getChoir(useContext(ChoirIdContext));
      setChoir(choirData);
    } catch (err) {
      console.log(err);
    }
  }

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
    if (choir.songs) {
      return choir.songs.map(song => {
        return songContent(song);
      })
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    loadChoir(abortController);
    return () => abortController.abort();
  }, [])
  
  return (
    <div className="Home">
      <Link to={`${stripTrailingSlash(props.match.url)}/edit`}>
        <button className="nav-btn">Edit</button>
      </Link>
      <h1>{choir.choir_details.name}</h1>
      <section id="overview">
        <p >
          {choir.choir_details.message}
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


