import EditIcon from "@material-ui/icons/Edit";

function SongInfo(props) {
  const parts = function() {
    //If the song has parts, render parts info list
    if (props.songParts) {
      return props.songParts.map(part => {
        return <span key={part.id}>{part.name}</span>
      })
    }
  }

  const editButton = function() {
    if (props.factoryMode === "idle") {
      return (
        <button type="button" onClick={handleEdit}>
          <EditIcon />
        </button>
      )
    } else {
      return ""
    }
  }


  const handleEdit = function() {
    props.editSong(props.song)
  }
  return (
    <div className="SongInfo">
      <span>{props.song.title}</span>
      <span>{`Parts (${props.song["parts_promised"]} promised):`}</span>
      {parts()}
      {editButton()}
    </div>
  )
}

export default SongInfo;