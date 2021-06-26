import SongInfo from "./SongInfo.js";

function CurrentCollection(props) {

  const songs = function() {
    //If parts have been loaded and set in state, render SongInfo list
    if (Object.keys(props.parts).length > 0) {
      return props.songs.map(song => {
        return (
          <SongInfo
            song={song}
            songParts={props.parts[song.id.toString()]}
            editSong={props.editSong}
            key={song.id}
            jobStatus={props.jobStatus}
          />
        )
      })
    }
  }
  return (
    <div className="CurrentSelection">
      {songs()}
    </div>
  )
}

export default CurrentCollection;