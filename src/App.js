import Header from './components/Header/Header';
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'

import style from './App.module.css';

function App() {

  return (
    <div className={style.wrapper}>
      <Header />

      <Main />

      <Footer />
    </div>
    
  );
}

export default App;
