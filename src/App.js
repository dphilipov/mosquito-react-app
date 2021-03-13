import Header from './components/Header/Header';
import Main from './components/Main/Main'
import style from './App.module.css';

function App() {
  return (
    <div className={style.wrapper}>
      <Header />

      <Main />
    </div>
    
  );
}

export default App;
