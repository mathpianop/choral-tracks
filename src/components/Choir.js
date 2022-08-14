import "../style/Home.css";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import AdminFilter from "./AdminFilter.js";
import Login from "./Login.js";


function Choir(props) {

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
  
  
  return (
    
    <div className="Choir">
        <Switch>
          <Route exact path="/choir/:choirId" render={(props) => <Home {...props} />} />
          <Route path="/choir/:choirId/admin" render={(props) => <AdminFilter {...props} token={token}/>}/>
          <Route path="/choir/:choirId/login" render={(props) => <Login {...props} setToken={setToken}/>} />
        </Switch>
    </div>
    
  )
}

export default Choir