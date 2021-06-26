import { useState } from "react";
import { Redirect } from "react-router";
import { apiUrl } from "../apiUrl.js"

function Login(props) {
  //Even if token is present, set isAuthed to false
  const [isAuthed, setIsAuthed] = useState(false)
  const [incorrectCredentials, setIncorrectCredentials] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  
  const handleChange = function(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = function(e) {
    e.preventDefault();

    //Create, fill, and post Login FormData
    const params = new FormData();
    params.append("password", formData.password)
    params.append("username", formData.username)

    fetch(`${apiUrl}/login`, {
      method: "post",
      body: params
    })
    .then(response => {
      return response.json();
    })
    .then(decodedResponse => {
      //If login successful, set the token in the App component
      // and in localStorage, and indicate that the admin is authed
      if (decodedResponse.status === 200) {
        localStorage.setItem("token", decodedResponse.token);
        setIsAuthed(true);
        props.setToken(decodedResponse.token);
        //If the response is 401 Unauthorized, indicate incorrectCredentials
      } else if (decodedResponse.status === 401) {
        setIncorrectCredentials(true)
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const incorrectCredentialsMessage = function() {
    return (incorrectCredentials ? "Either the username or password is incorrect" : "")
  }

  if (isAuthed) {
    return <Redirect to="/admin"></Redirect>
  } else {
    return (
      <div className="Login">
        <span id="incorrect-credentials-message">
          {incorrectCredentialsMessage()}
        </span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
          />
          <input type="submit" value="Log in"/>
        </form>
      </div>
    )
  }
}

export default Login