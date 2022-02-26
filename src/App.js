import { HashRouter } from "react-router-dom";
import Choir from "./components/Choir.js";


import "./App.css"

function App() {
  // Pass in hardcoded choirId (for HT) for the time being
  return (
    <HashRouter>
      <Choir choirId={1}/>
    </HashRouter>
  )
}

export default App;