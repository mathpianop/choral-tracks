import { Redirect } from "react-router-dom";
import Admin from "./Admin.js";

function AdminFilter(props) {

  //If the admin is authenticated by the presence of a token, render the Admin page.
  //Otherwise, redirect to Login.
  return (props.token ? <Admin token={props.token} choirId={props.choirId}/> : <Redirect to="./login" />)
  
}


export default AdminFilter;
