import React from 'react';
import { Routes , Route} from 'react-router-dom'
import './App.css';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
