import "../style/SongBtn.css";

function SongBtn(props) {

  

  const handleClick = function() {
    props.setSelectedSong(props.id);
  }

  return (
    <button className="SongBtn" onClick={handleClick}>
      {props.title}
    </button>
  )
}

export default SongBtn;
