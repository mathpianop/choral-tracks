import { useState } from "react";
import PreferenceBtn from "./PreferenceBtn.js";
import "../../style/choir/Preferences.css";

function Preferences(props) {
  const [selectedPreference, setSelectedPreference] = useState({
    role: "full-choir",
    partName: null
  });
  
  const isSelected = function(role, partName) {
    return (selectedPreference.role === "full-choir" && role === "full-choir") ||
          (selectedPreference.role === role && selectedPreference.partName === partName);
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
              partName={part.name}
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
              partName={part.name}
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