import { useState } from "react";
import { Redirect } from "react-router";
import { apiUrl } from "../apiUrl.js"

function Login(props) {

  const [isAuthed, setIsAuthed] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  
  const handleChange = function(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = function(e) {
    e.preventDefault();

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
      console.log(decodedResponse)
      if (decodedResponse.status === 200) {
        
        localStorage.setItem("token", decodedResponse.token);
        setIsAuthed(true);
        props.setToken(decodedResponse.token);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
  if (isAuthed) {
    return <Redirect to="/admin"></Redirect>
  } else {
    return (
      <div className="Login">
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