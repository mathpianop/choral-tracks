import { HashRouter, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Choir from "./components/Choir.js";


import "./App.css"

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path={"/choir"} component={Choir}/>
      </Switch>
    </HashRouter>
  )
}

export default App;