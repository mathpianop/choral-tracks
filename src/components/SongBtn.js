function SongBtn(props) {

  const capitalize = function(string) {
    const substrings = string.split("-");
    //Capitalize Substrings
    const capitalizedSubstrings = substrings.map(substring => {
      return substring.charAt(0).toUpperCase() + substring.slice(1);
    })
    return capitalizedSubstrings.join(" ");
  }

  const handleClick = function() {
    props.setSelectedSong(props.id);
  }

  return (
    <button className="SongBtn" onClick={handleClick}>
      {capitalize(props.title)}
    </button>
  )
}

export default SongBtn;
