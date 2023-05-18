import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import {FirebaseContext} from './store/firebaseContext' 
import db from './firebase/config';

ReactDOM.render(
 <React.StrictMode>
  <FirebaseContext.Provider value={{db}}>
  <Router>
   <App />
  </Router>
  </FirebaseContext.Provider>
 </React.StrictMode>
 , document.getElementById('root'));
