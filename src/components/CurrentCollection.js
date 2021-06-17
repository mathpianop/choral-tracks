import SongInfo from "./SongInfo.js";


function CurrentCollection(props) {
 

  const songsContent = function() {
    //If parts have been loaded and set in state, render SongInfo list
    if (Object.keys(props.parts).length > 0) {
      return props.songs.map(song => {
        return (
          <SongInfo
            song={song}
            songParts={props.parts[song.id.toString()]}
            editSong={props.editSong}
            key={song.id}
          />
        )
      })
    }
  }

  
  return (
    <div className="CurrentSelection">
      {songsContent()}
    </div>
  )
}

export default CurrentCollection;