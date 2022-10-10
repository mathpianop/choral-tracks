import "../style/SongBtn.css";

function SongBtn(props) {

  return (
    <button className="SongBtn" onClick={() => props.setSelectedSong(props.id)}>
      {props.title}
    </button>
  )
}

export default SongBtn;
