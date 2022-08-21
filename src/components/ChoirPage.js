import "../style/Home.css";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import AdminFilter from "./AdminFilter.js";
import Login from "./Login.js";
import getChoir from "../network/getChoir";


function ChoirPage() {

  const findLocalToken = function() {
    try {
      //Try to return token from localStorage
      return localStorage.getItem("token");
    } catch (err) {
      //If not permitted (becuase of Chrome Incognito 3rd-party, etc.), return null
      return null;
    }
  }

  const [token, setToken] = useState(findLocalToken());
  const [adminId, setAdminId] = useState();
  const [songs, setSongs] = useState();
  const { choirId } = useParams(); 
  
  const loadChoir = async function() {
    try {
      const choirData = await getChoir(choirId);
      setSongs(choirData.songs);
      setAdminId(choirData.choir_details.admin_id);
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    //On ComponentDidMount fetch the choir resource
    loadChoir();
  // eslint-disable-next-line
  }, [])

  return (
    
    <div className="Choir">
        <Switch>
          <Route exact path="/choir/:choirId" render={(props) => <Home {...props} songs={songs} />} />
          <Route path="/choir/:choirId/admin" render={(props) => <AdminFilter {...props} token={token} adminId={adminId}/>}/>
          <Route path="/choir/:choirId/login" render={(props) => <Login {...props} setToken={setToken}/>} />
        </Switch>
    </div>
    
  )
}

export default ChoirPage;