import TokenContext from "./TokenContext";
import { Redirect } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

function AdminFilter({token, setToken, targetPath, children}) {
  
  const ErrorHandler = function({ error }) {
    if (error.isUnauthorized) {
      return <RedirectToLogin />
    }
  }

  const RedirectToLogin = function() {
    return <Redirect to={{
      pathname: "../../login",
      state: {
        setToken: setToken,
        targetPath: targetPath
      }
    }} />
  }



  // If the admin is authenticated by the presence of a token, 
  // render the admin-restricted child component.
  // Otherwise, redirect to Login.

  const content = function() {
    if (token) {
      return (
        <TokenContext.Provider value={token}>
          <ErrorBoundary FallbackComponent={ErrorHandler} >
            {children}
          </ErrorBoundary>
        </TokenContext.Provider>
      )
    } else {
      return <RedirectToLogin />
    }
  }

  return content();
  
}


export default AdminFilter;
