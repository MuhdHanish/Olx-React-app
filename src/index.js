import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { FirebaseContext } from './store/Context'
import AuthContext from './store/Context'
import db from './firebase/config';

ReactDOM.render(
 <React.StrictMode>
  <FirebaseContext.Provider value={{ db }}>
   <AuthContext>
    <Router>
     <App />
    </Router>
   </AuthContext>
  </FirebaseContext.Provider>
 </React.StrictMode>
 , document.getElementById('root'));
