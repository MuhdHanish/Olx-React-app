import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { HandelState } from '../../useForm';
import { FirebaseContext } from '../../store/Context'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore'


export default function Signup() {
  const { db } = useContext(FirebaseContext)
  const navigate = useNavigate()
  const [errors, setError] = useState({})
  const validation = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    phone: /^\d{10}$/,
    name: /^[A-Za-z\s]+$/
  };

  const [state, setState] = HandelState({
    name: "",
    email: "",
    phone: "",
    password: "",
    returnSecureToken: true
  })

  const HandleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = state.name.trim();
    if (validation.name.test(trimmedName) === false) {
      setError({ name: 'Invalid name' });
      return;
    }
    const trimmedEmail = state.email.trim();
    if (validation.email.test(trimmedEmail) === false) {
      setError({ email: 'Invalid email' });
      return;
    }
    const trimmedPhone = state.phone.trim();
    if (validation.phone.test(trimmedPhone) === false) {
      setError({ phone: 'Invalid phone' });
      return;
    }
    const trimmedPassword = state.password.trim();
    if (validation.password.test(trimmedPassword) === false) {
      setError({ password: 'Invalid password' });
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: state.name
        })
          .then(() => {
            addDoc(collection(db, 'users'), {
              uid: user.uid,
              name: state.name,
              email: state.email,
              phone: state.phone,
              password: state.password
            }).then(() => navigate('/login'))
          })
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setError({ general: 'This email already exitsted' })
        }
        else {
          setError({ general: error.message })
        }
      });
  };



  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={HandleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={state.name}
            onChange={setState}
            defaultValue="John"
          />
          <br />
          {errors.name && (<div style={{ color: 'red', marginTop: '5px', marginBottom: '5px' }}>{errors.name}</div>)}
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
          {errors.email && (<div style={{ color: 'red', marginTop: '5px', marginBottom: '5px' }}>{errors.email}</div>)}
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={state.phone}
            onChange={setState}
            defaultValue="Doe"
          />

          <br />
          {errors.phone && (<div style={{ color: 'red', marginTop: '5px', marginBottom: '5px' }}>{errors.phone}</div>)}
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={state.password}
            onChange={setState}
            defaultValue="Doe"
          />
          <br />
          {errors.password && (<div style={{ color: 'red', marginTop: '5px', marginBottom: '5px' }}>{errors.password}</div>)}
          <br />
          {errors.general && (<div style={{ color: 'red', marginTop: '5px', marginBottom: '5px' }}>{errors.general}</div>)}
          <button type='submit'>Signup</button>
        </form>
        <Link style={{textDecoration:'none'}} to='/login'>Login</Link>
      </div>
    </div>
  );
}
