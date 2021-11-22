import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
      <AuthContextProvider>
        <Router>
          <App />
        </Router>
      </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);