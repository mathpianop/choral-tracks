import "../style/Home.css";
import { useParams } from "react-router-dom";
import Home from "./choir/Home";
import ChoirIdContext from "./ChoirIdContext";


function ChoirPage() {

  const { choirId } = useParams(); 
  
  return (
    <div className="Choir">
      <ChoirIdContext.Provider value={choirId}>
        <Home/>
      </ChoirIdContext.Provider>
    </div>
    
  )
}

export default ChoirPage;