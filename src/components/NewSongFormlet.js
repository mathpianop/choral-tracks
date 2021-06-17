
import PartFormlet from "./PartFormlet.js"

function NewSongFormlet(props) {

  
  return (
    <div className="NewSong">
      {props.parts.map((part, index) => {
      return (
        <PartFormlet
          index={index} 
          key={part.key} 
          name={part.name}
          initial={part.initial}
          recording={part.recording}
          updatePart={props.updatePart}
          removePart={props.removePart}
        />
      )
    })}
    </div>
  )
}

export default NewSongFormlet;
