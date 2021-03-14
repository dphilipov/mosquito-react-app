import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'

import style from './App.module.css';

function App() {

  return (
    <React.Fragment>
      <Header />
        <Main />
      <Footer />
    </React.Fragment>
  );
}

export default App;
