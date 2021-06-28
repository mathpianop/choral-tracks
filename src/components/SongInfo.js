import EditIcon from "@material-ui/icons/Edit";

function SongInfo(props) {
  const parts = function() {
    //If the song has parts, render parts info list
    if (props.songParts) {
      return props.songParts.map(part => part.name).join(", ")
    }
  }

  const editButton = function() {
    //If a job not currently being assembled or executed, display edit button
    switch (props.jobStatus) {
      case "creating":
      case "updating":
      case "destroying":
      case "assembly":
        return "";
      default: 
        return (
          <button type="button" onClick={handleEdit}>
            <EditIcon />
          </button>
        )
    }
  }

  const handleEdit = function() {
    props.editSong(props.song)
  }
  
  return (
    <div className="SongInfo">
      <span>{props.song.title}</span>
      <div>
        {`Parts (${props.song["parts_promised"]} expected): `}
        <span>{parts()}</span>
      </div>
      {editButton()}
    </div>
  )
}

export default SongInfo;