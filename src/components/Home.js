import "../style/Home.css";
import { Route } from "react-router-dom";
import { HashRouter, Switch } from "react-router-dom";
import { useState } from "react";
import DefaultHome from "./DefaultHome";
import AdminFilter from "./AdminFilter.js";
import Login from "./Login.js";

function Home(props) {

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
    <div className="home">
      {/* <Link to={`${props.match.path}/hello`}>Click Me</Link>
      <Link to={`${props.match.path}/world`}>Or Me</Link> */}
      <HashRouter>
        <Switch>
          <Route exact path="/:choirName" component={DefaultHome} />
          <Route path="/:choirName/admin" render={(props) => <AdminFilter {...props} token={token}/>}/>
          <Route path="/:choirName/login" render={(props) => <Login {...props} setToken={setToken}/>} />
        </Switch>
      </HashRouter>
    </div>
    
  )
}

export default Home