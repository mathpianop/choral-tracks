import SongFactory from "./components/SongFactory.js";
import CurrentCollection from "./components/CurrentCollection.js"

function Admin() {
  
  return (
    <div className="Admin">
      <CurrentCollection />
      <SongFactory />
    </div>
  )
}

export default Admin;