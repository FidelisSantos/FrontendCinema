import { useState } from 'react';
import { LoginType } from '../types/LoginType';
import { appService } from  '../service/appService';
export function useApp() {
  const [isAuth, setIsAuth] = useState(false);
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [page, setPage] = useState('home');
  
  const loginAdm = async (email: string, password: string) => { 
    const login: LoginType = {
      email: email,
      password: password,
    }
    const token = await appService.loginAdm(login);
    localStorage.setItem('token', token);
    console.log(token);
    console.log(localStorage.getItem('token'));
    if(token) setIsAuth(true);
    else {
      setErrorLogin(true);
      const errorInterval = setInterval(() => {
        setErrorLogin(false);
        clearInterval(errorInterval);
      }, 5000);
    }
  }
  return { isAuth, setIsAuth, loginAdm , 
            errorLogin, setErrorLogin,
          error, setError,errorMessage, 
          setErrorMessage, page, setPage};
}