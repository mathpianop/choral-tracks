import "../style/Home.css";
import { Route, Switch, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./choir/Home";
import AdminFilter from "./AdminFilter.js";
import Login from "./Login.js";
import getChoir from "../network/getChoir";
import EditSongs from "./edit/EditSongs";
import ChoirIdContext from "./ChoirIdContext";


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
  const { choirId } = useParams(); 
  
 


  return (
    <div className="Choir">
      <ChoirIdContext.Provider value={choirId}>
        <Switch>
          <Route exact path="/choir/:choirId" component={Home} />
            <Route path="/choir/:choirId/edit" render={(props) => 
                <AdminFilter {...props} token={token}>
                  <EditSongs choirId={choirId} />
                </AdminFilter>
              }/>
          <Route path="/choir/:choirId/login" render={(props) => <Login {...props} setToken={setToken}/>} />
        </Switch>
      </ChoirIdContext.Provider>
        
    </div>
    
  )
}

export default ChoirPage;