import React, { useState,useRef } from 'react'
import loginImage from "../../images/login.jpg"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import "../../styles/login.css"

export const Login = () => {
    const navigate = useNavigate();
  const [email, setemail] = useState("")
  const [pass,setPass]=useState("")
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(email,pass)
    axios.post("http://localhost:8000/api/auth/login",{
      email:email,
      password:pass
    },).then((res)=>{
        const data=res.data
        console.log(data.user)
        // console.log(data.user.userId)
        localStorage.setItem("id",data.user.userId)
        navigate('/dashboard')
      
    }).catch((err) => {
      console.error('Error:', err.response ? err.response.data : err.message);
    });
  }
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2>Welcome to Learning Center!!</h2>
          <p>Sign into your account</p>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Phone or Email address" required onChange={(e)=>setemail(e.target.value)} value={email} />
            <input type="password" placeholder="Password" required onChange={(e)=>setPass(e.target.value)} value={pass} />
            <button type="submit" className="login-button">Log In</button>
            <a href="/" className="forgot-password">Forgot password?</a>
          </form>
        </div>
        <div className="login-image">
          <img
            src={loginImage}
            alt="Illustration"
          />
        </div>
      </div>
    </div>
  )
}
