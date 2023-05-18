import React from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import {HandelState} from '../../useForm'
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate()
  const [state,setState] = HandelState({
    email:"",
    password:"",
    returnSecureToken: true
  })

  const HandleSubmit = (e) =>{
    e.preventDefault()
    try{
     const auth = getAuth()
     signInWithEmailAndPassword(auth,state.email,state.password).then((userData)=>{
      navigate('/')
     }).catch((err)=>{
          console.log(err.code);
     })
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={HandleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={state.email}
            onChange={setState}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={state.password}
            onChange={setState}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button type='submit'>Login</button>
        </form>
        <a href>Signup</a>
      </div>
    </div>
  );
}

export default Login;
