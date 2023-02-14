import { HashRouter, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import ChoirPage from "./components/ChoirPage.js";
import Login from "./components/Login";
import Dashboard from "./components/dashboard/Dashboard.js";


import "./App.css"

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Route path="/admin/:adminId" component={Dashboard} />
        <Route path={"/choir/:choirId"} component={ChoirPage}/>
      </Switch>
    </HashRouter>
  )
}

export default App;