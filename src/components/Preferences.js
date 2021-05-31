
import PreferenceBtn from "./PreferenceBtn.js";

function Preferences(props) {
  
  return (
    <div className="PreferenceBtns">  
      <div className="emphasize-btns">
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
        <button onClick={props.resetParts}>Full Choir</button>
      </div>
    </div>
  )
}

export default Preferences