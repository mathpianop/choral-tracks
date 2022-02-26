import "../style/Home.css";
import { Route } from "react-router-dom";
import { Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
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
  const history = useHistory();
  
  useEffect(() => history.push(`/${props.choirId}`), []);
  
  return (
    
    <div className="Choir">
        <Switch>
          <Route exact path="/:choirId" component={Home} />
          <Route path="/:choirId/admin" render={(props) => <AdminFilter {...props} token={token}/>}/>
          <Route path="/:choirId/login" render={(props) => <Login {...props} setToken={setToken}/>} />
        </Switch>
    </div>
    
  )
}

export default Choir