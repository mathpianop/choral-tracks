import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import SongPlayer from "./SongPlayer.js";
import SongBtn from "./SongBtn.js";
import { AudioContext } from 'standardized-audio-context';
import ChoirIdContext from "../ChoirIdContext.js";
import getChoir from "../../network/getChoir.js";

function Home(props) {
  //Store id of selected song
  const [choir, setChoir] = useState({})
  const [selectedSong, setSelectedSong] = useState(null);
  const [audioContext] = useState(new AudioContext());
  const { choirId } = useParams()

  const loadChoir = async function(abortController) {
    try {
      const choirData = await getChoir(choirId, abortController.signal);
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
      const publishedSongs = choir.songs.filter(song => song.publish);
      return publishedSongs.map(song => {
        return songContent(song);
      })
    }
  }

  const choirName = () => choir.choir_details ? choir.choir_details.name: "" ;
  const choirMessage = () => choir.choir_details ? choir.choir_details.message: "" ;

  useEffect(() => {
    const abortController = new AbortController();
    loadChoir(abortController);
    return () => abortController.abort();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div className="Home">
      <Link 
        to={{
          pathname: `../../admin/${choir.choir_details && choir.choir_details.admin_id}`,
          state: {
            selectedChoirId: choirId
          },
        }}
      >
        <button className="nav-btn">Edit</button>
      </Link>
      <h1>{choirName()}</h1>
      <section id="overview">
        <p >
          {choirMessage()}
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


