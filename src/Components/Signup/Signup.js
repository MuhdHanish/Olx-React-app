import React from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { useForm } from '../../useForm';

export default function Signup() {

  const [state,setState] = useForm({
    name:"",
    email:"",
    phone:"",
    password:""
  })

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form>
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
          <button>Signup</button>
        </form>
        <a href>Login</a>
      </div>
    </div>
  );
}
