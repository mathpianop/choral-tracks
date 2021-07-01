import EditIcon from "@material-ui/icons/Edit";
import "../style/SongInfo.css"

function SongInfo(props) {
  const parts = function() {
    //If the song has parts, render parts info list
    if (props.songParts) {
      return props.songParts.map(part => {
        return <span className="part-name" key={part.name}>{part.name}</span>
      })
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
          <button type="button" className="edit-btn" onClick={handleEdit}>
            <EditIcon />
          </button>
        )
    }
  }

  const numberPromised = function() {
    //If no parts were fulfilled or not all the parts were fulfilled,
    //indicate the number of parts expected
    if (!props.songParts || props.song["parts_promised"] > props.songParts.length) {
      return ` (${props.song["parts_promised"]} expected)`
    } else {
      return "";
    }
  }

  const handleEdit = function() {
    props.editSong(props.song)
  }
  
  return (
    <div className="SongInfo">
      <div className="song-info-title-bar">
        <h5 className="song-info-title">{props.song.title}</h5>
        {editButton()}
      </div>
      <div className="song-info-parts">
        <div className="song-info-parts-title-bar">
          <h6 className="parts-header">Parts</h6>
          <span className="number-promised">{numberPromised()}</span>
        </div>
        <div className="song-parts">{parts()}</div>
      </div>
      
    </div>
  )
}

export default SongInfo;