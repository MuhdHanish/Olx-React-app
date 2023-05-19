import React,{useEffect,useContext} from 'react';
import { Routes , Route} from 'react-router-dom'
import './App.css';
import {AuthContext} from './store/Context'
import Post from './store/PostContext';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import ViewPost from './Pages/ViewPost'

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
    <Post>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/view' element={<ViewPost/>}/>
      </Routes>
      </Post>
    </div>
  );
}

export default App;
