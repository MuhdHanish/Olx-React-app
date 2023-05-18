import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { HandelState } from '../../useForm';
import { FirebaseContext } from '../../store/firebaseContext'
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { addDoc , collection } from 'firebase/firestore'


export default function Signup() {
  const { db } = useContext(FirebaseContext)
  const navigate = useNavigate()
  const [state, setState] = HandelState({
    name: "",
    email: "",
    phone: "",
    password: ""
  })

  const HandleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: state.name
        })
          .then(() => {
            addDoc(collection(db,'users'),{
              uid:user.uid,
              name:state.name,
              email:state.email,
              phone:state.phone,
              password:state.password
            }).then(()=>navigate('/login'))
          })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
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
          <br />
          <button type='submit'>Signup</button>
        </form>
        <a href>Login</a>
      </div>
    </div>
  );
}
