import { HashRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home.js";
import AdminFilter from "./components/AdminFilter.js";
import Login from "./components/Login.js";
import "./App.css"

function App() {
  
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
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/admin" render={(props) => <AdminFilter {...props} token={token}/>}/>
        <Route path="/login" render={(props) => <Login {...props} setToken={setToken}/>} />
      </Switch>
    </HashRouter>
  )
}

export default App;