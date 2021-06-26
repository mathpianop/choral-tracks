import { HashRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Public from "./components/Public.js";
import AdminFilter from "./components/AdminFilter.js";
import Login from "./components/Login.js";
import "./App.css"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  console.log(token)
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Public} />
        <Route path="/admin" render={(props) => <AdminFilter {...props} token={token} />}/>
        <Route path="/login" render={(props) => <Login {...props} setToken={setToken} />} />
      </Switch>
    </HashRouter>
  )
}

export default App;