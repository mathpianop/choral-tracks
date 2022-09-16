import EditIcon from "@material-ui/icons/Edit";
import "../style/SongInfo.css"

function SongInfo(props) {


  const editButton = function() {
    //If a job not currently being assembled or executed, display edit button
    if(props.statusInfo.isInProgress()) {
      return "";
    } else {
      return (
        <button type="button" className="edit-btn" onClick={handleEdit}>
          <EditIcon />
        </button>
      );
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
      
    </div>
  )
}

export default SongInfo;