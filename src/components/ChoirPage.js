import "../style/Home.css";
import { Route, Switch, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./choir/Home";
import AdminFilter from "./AdminFilter.js";
import Login from "./Login.js";
import getChoir from "../network/getChoir";
import EditSongs from "./edit/EditSongs";


function ChoirPage() {

  const findLocalToken = function() {
    try {
      //Try to return token from localStorage
      return localStorage.getItem("token");
    } catch (err) {
      console.log("Couldn't find token");
      //If not permitted (becuase of Chrome Incognito 3rd-party, etc.), return null
      return null;
    }
  }

  const [token, setToken] = useState(findLocalToken());
  const [songs, setSongs] = useState();
  const { choirId } = useParams(); 
  
  const loadChoir = async function() {
    try {
      const choirData = await getChoir(choirId);
      setSongs(choirData.songs);
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    //On ComponentDidMount fetch the choir resources
    loadChoir();
  // eslint-disable-next-line
  }, [])

  return (
    <div className="Choir">
        <Switch>
          <Route exact path="/choir/:choirId" render={(props) => <Home {...props} songs={songs} />} />
          <Route path="/choir/:choirId/edit" render={(props) => 
              <AdminFilter {...props} token={token}>
                <EditSongs choirId={choirId} />
              </AdminFilter>
            }/>
          <Route path="/choir/:choirId/login" render={(props) => <Login {...props} setToken={setToken}/>} />
        </Switch>
    </div>
    
  )
}

export default ChoirPage;