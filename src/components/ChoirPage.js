import "../style/Home.css";
import { Route, Switch, useParams } from "react-router-dom";
import { useState } from "react";
import Home from "./choir/Home";
import AdminFilter from "./AdminFilter.js";
import EditChoir from "./edit/EditChoir";
import ChoirIdContext from "./ChoirIdContext";
import findLocalToken from "../helpers/findLocalToken";


function ChoirPage() {


  const [token, setToken] = useState(findLocalToken());
  const { choirId } = useParams(); 
  
 


  return (
    <div className="Choir">
      <ChoirIdContext.Provider value={choirId}>
        <Switch>
          <Route exact path="/choir/:choirId" component={Home} />
          <Route path="/choir/:choirId/edit" render={(props) => 
              <AdminFilter {...props} token={token} setToken={setToken} targetPath={`./choir/${choirId}/edit`}>
                <EditChoir choirId={choirId} />
              </AdminFilter>
            }/>
        </Switch>
      </ChoirIdContext.Provider>
        
    </div>
    
  )
}

export default ChoirPage;