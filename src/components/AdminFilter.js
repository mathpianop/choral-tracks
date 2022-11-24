import TokenContext from "./TokenContext";
import { Redirect } from "react-router-dom";

function AdminFilter({token, children}) {


  // If the admin is authenticated by the presence of a token, 
  // render the admin-restricted child component.
  // Otherwise, redirect to Login.

  const content = function() {
    if (token) {
      return (
        <TokenContext.Provider value={token}>
          {children}
        </TokenContext.Provider>
      )
    } else {
      return <Redirect to="./login" />
    }
  }

  return content();
  
}


export default AdminFilter;
