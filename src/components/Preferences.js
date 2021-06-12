import { useState } from "react";
import PreferenceBtn from "./PreferenceBtn.js";
import "../style/Preferences.css";

function Preferences(props) {
  const [selectedPreference, setSelectedPreference] = useState({
    role: "full-choir",
    part: null
  });
  
  const isSelected = function(role, part) {
    if (selectedPreference.role === "full-choir" && role === "full-choir") {
      return true
    } else if (selectedPreference.role === role && selectedPreference.part === part) {
      return true
    } else {
      return false
    }
  }
  
  return (
    <div 
      className="Preferences" 
      style={{gridTemplateColumns: `repeat (${props.parts.length}, auto)`}}
    >  
      
        <span>Emphasize</span>
        {props.parts.map(part => {
          return (
            <PreferenceBtn 
              key={`emphasize-${part.name}`}
              part={part.name}
              content={part.initial}
              role="emphasize" 
              handler={props.emphasizePart}
              selected={isSelected("emphasize", part.name)}
              setSelectedPreference={setSelectedPreference}
            />
          )
        })}
   
        <span>Isolate</span>
        {props.parts.map(part => {
          return (
            <PreferenceBtn 
              key={`isolate-${part.name}`}
              part={part}
              content={part.initial}
              role="isolate" 
              handler={props.isolatePart}
              selected={isSelected("isolate", part.name)}
              setSelectedPreference={setSelectedPreference}
            />
          )
        })}

        <div 
          className="full-choir-container"
          style={{gridColumn: `2 / ${props.parts.length + 2}`}}
        >
          <PreferenceBtn 
            onClick={props.fullChoir}
            selected={isSelected("full-choir")}
            role={"full-choir"}
            content="Full Choir"
            handler={props.fullChoir}
            setSelectedPreference={setSelectedPreference}
          />
        </div>
    </div>
  )
}

export default Preferences;