import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { HandelState } from '../../useForm'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate()

  const [errors, setError] = useState({})

  const validation = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  }

  const [state, setState] = HandelState({
    email: "",
    password: "",
    returnSecureToken: true
  })

  const HandleSubmit = (e) => {
    e.preventDefault()
    try {
      const trimmedEmail = state.email.trim();
      if (validation.email.test(trimmedEmail) === false) {
        setError({ email: 'Invalid email' });
        return;
      }
      const trimmedPassword = state.password.trim();
      if (validation.password.test(trimmedPassword) === false) {
        setError({ password: 'Invalid password' });
        return;
      }
      const auth = getAuth()
      signInWithEmailAndPassword(auth, state.email, state.password).then((userData) => {
        navigate('/')
      }).catch((err) => {
        if(err.code==='auth/wrong-password')
        setError({general:'wrong password'})
        return
      })
    } catch (err) {
      setError({general:'wrong password'})
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
          {errors.email&&(<div style={{color:'red',marginTop:'5px',marginBottom:'5px'}}>{errors.email}</div>)}
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
          {errors.password&&(<div style={{color:'red',marginTop:'5px',marginBottom:'5px'}}>{errors.password}</div>)}
          <br />
          <br />
          <button type='submit'>Login</button>
        </form>
        {errors.general&&(<div style={{color:'red',marginTop:'5px',marginBottom:'5px'}}>{errors.general}</div>)}
        <Link style={{textDecoration:'none'}} to='/signup' >Signup</Link>
      </div>
    </div>
  );
}

export default Login;
