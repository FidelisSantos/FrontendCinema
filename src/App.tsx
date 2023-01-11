import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import { Home } from './ui/pages/Home/Home';
import { useApp } from './hooks/useApp';
import { Salas } from './ui/pages/Salas/Salas';
import { Filmes } from './ui/pages/Filmes/Filmes';



function App() {
  const { isAuth, setIsAuth, loginAdm , 
          errorLogin, setErrorLogin,
          error, setError, errorMessage, 
          setErrorMessage, page, setPage } = useApp();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' 
        element=
          {<Home isAuth={isAuth} setIsAuth={setIsAuth}
            errorLogin={errorLogin} setErrorLogin={setErrorLogin}
            loginAdm={loginAdm} page={page} setPage={setPage}/>}
        />
        <Route path='/salas' 
        element= 
        {<Salas isAuth={isAuth} setIsAuth={setIsAuth} error={error}
          setError={setError} errorMessage={errorMessage} setErrorMessage={setErrorMessage}
          page={page} setPage={setPage}
        />}/>
        <Route path='/filmes' 
        element=
        { <Filmes  isAuth={isAuth} setIsAuth={setIsAuth} error={error}
          setError={setError} errorMessage={errorMessage} setErrorMessage={setErrorMessage}
          page={page} setPage={setPage}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
