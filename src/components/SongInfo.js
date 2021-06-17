import Edit from "@material-ui/icons/Edit";

function SongInfo(props) {
  const partsContent = function() {
    //If the song has parts, render parts info list
    if (props.songParts) {
      return props.songParts.map(part => {
        return <span key={part.id}>{part.name}</span>
      })
    }
  }

  const handleEdit = function() {
    props.editSong(props.song)
  }
  return (
    <div className="SongInfo">
      <span>{props.song.title}</span>
      <span>{`Parts (${props.song["parts_promised"]} promised):`}</span>
      {partsContent()}
      <button type="button" onClick={handleEdit}>
        <Edit />
      </button>
    </div>
  )
}

export default SongInfo;