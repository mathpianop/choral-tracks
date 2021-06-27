import { Redirect } from "react-router-dom";
import Admin from "./Admin.js";

function AdminFilter(props) {
  //If the admin is authenticated by the presence of a token, render the Admin page.
  //Otherwise, redirect to Login.

  if (props.token) {
    console.log(props.token)
    console.log(props.token)
    console.log("true")
  } else {
    console.log(props.token)
    console.log("false")
  }

  if (props.token) {
    // console.log("Should Be True", props.token)
    return (<Admin token={props.token}/>);
  } else {
    return (<Redirect to="/login" />);
  } 
  
}


export default AdminFilter;
