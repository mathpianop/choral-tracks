import { HashRouter, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import ChoirPage from "./components/ChoirPage.js";


import "./App.css"

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path={"/choir/:choirId"} component={ChoirPage}/>
      </Switch>
    </HashRouter>
  )
}

export default App;