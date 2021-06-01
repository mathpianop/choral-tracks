import PreferenceBtn from "./PreferenceBtn.js";
import "../style/Preferences.css";

function Preferences(props) {
  
  return (
    <div 
      className="Preferences" 
      style={{gridTemplateColumns: `repeat (${props.parts.length}, auto)`}}
    >  
      
        <span>Emphasize</span>
        {props.parts.map(part => {
          return (
            <PreferenceBtn 
              key={`emphasize-${part}`}
              part={part}
              initial={props.initials[part]}
              role="emphasize" 
              handler={props.emphasizePart}
            />
          )
        })}
   
        <span>Isolate</span>
        {props.parts.map(part => {
          return (
            <PreferenceBtn 
              key={`isolate-${part}`}
              part={part}
              initial={props.initials[part]}
              role="isolate" 
              handler={props.isolatePart}
            />
          )
        })}
      
      <div 
        className="full-choir-container" 
        style={{gridColumn: `2 / ${props.parts.length + 2}`}}
      >
        <button className="PreferenceBtn full-choir" onClick={props.fullChoir}>
            Full Choir
        </button>
      </div>
    </div>
  )
}

export default Preferences;