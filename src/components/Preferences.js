import PreferenceBtn from "./PreferenceBtn.js";
import "../style/Preferences.css";

function Preferences(props) {
  
  return (
    <div className="PreferenceBtns">  
      <div className="emphasize-btns">
        <span>Emphasize</span>
        {props.parts.map(part => {
          return (
            <PreferenceBtn 
              key={`emphasize-${part}`}
              part={part}
              role="emphasize" 
              handler={props.emphasizePart}
            />
          )
        })}
      </div>
      <div className="isolate-btns">
        <span>Isolate</span>
        {props.parts.map(part => {
          return (
            <PreferenceBtn 
              key={`isolate-${part}`}
              part={part}
              role="isolate" 
              handler={props.isolatePart}
            />
          )
        })}
      </div>
      <div className="reset-btn-container">
        <button className="PreferenceBtn full-choir" onClick={props.resetParts}>
            Full Choir
        </button>
      </div>
    </div>
  )
}

export default Preferences;