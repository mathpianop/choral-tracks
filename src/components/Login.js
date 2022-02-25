import { useState } from "react";
import { Redirect } from "react-router";
import { apiUrl } from "../apiUrl.js"
import "../style/Login.css";

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

  const setLocalToken = function(tokenString) {
    //Set local token to remember login
    //If localStorage is unavailable, swallow error
    try {
      localStorage.setItem("token", tokenString);
    } catch {}
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
        setLocalToken(decodedResponse.token)
        props.setToken(decodedResponse.token);
        setIsAuthed(true);
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
    return (incorrectCredentials ? "Either the username or the password is incorrect" : "")
  }

  if (isAuthed) {
    return <Redirect to="./admin"></Redirect>
  } else {
    return (
      <div className="Login central-container">
        
          <span id="incorrect-credentials-message">
            {incorrectCredentialsMessage()}
          </span>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              className="text-input"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              className="text-input" 
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input type="submit" className="pseudo-btn" value="Log in"/>
          </form>
      </div>
    )
  }
}

export default Login