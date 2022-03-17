import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    const data = {email:email, password:password};
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.status){
        localStorage.setItem("user_data", JSON.stringify(response.data.data));
        response.data.companyDetails && localStorage.setItem("company_details", JSON.stringify(response.data.companyDetails));
        alert('Logged in succesfully!');
        window.location.href = "/registerCompany";
      }
    });
  };

  return (
    <div className="w-25 p-3">

                <Link to="/login" className='btn btn-primary'> Login</Link> &nbsp; 
                <Link to="/signup" className='btn btn-primary'> Signup</Link>   &nbsp; 
                <form onSubmit={login}>

                  <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="">Email: </label>
                    <input type="email" id="" className="form-control" placeholder="Enter email address" 
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }} />
                    
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="">Password:</label>
                    <input type="password" id="" className="form-control" 
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }} />
                    
                  </div>

                  <input type="submit" onClick={login} className="btn btn-primary" value="Login"/>
                </form>
    </div>
  )
}

export default Login