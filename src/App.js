import React,{useEffect,useContext} from 'react';
import { Routes , Route} from 'react-router-dom'
import './App.css';
import {AuthContext} from './store/Context'

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Create from './Pages/Create';

function App() {
  const {setUser} = useContext(AuthContext);
  const auth = getAuth()
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  })
  return (
    <div>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
    </div>
  );
}

export default App;
