import { useState } from 'react';

import { appService } from '../service/appService';
import { LoginType } from '../types/LoginType';
export function useApp() {
	const [isAuth, setIsAuth] = useState(false);
	const [errorLogin, setErrorLogin] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [page, setPage] = useState('home');
	const errorImg =
		'https://firebasestorage.googleapis.com/v0/b/cinema-37539.appspot.com/o/FilmesImagens%2Ferror.png?alt=media&token=fb3b22a0-ae8e-44e1-ba64-0aabd1c1814b';

	const loginAdm = async (email: string, password: string) => {
		const login: LoginType = {
			email,
			password
		};
		const token = await appService.loginAdm(login);
		localStorage.setItem('token', token);
		console.log(token);
		console.log(localStorage.getItem('token'));
		if (token) setIsAuth(true);
		else {
			setErrorLogin(true);
			const errorInterval = setInterval(() => {
				setErrorLogin(false);
				clearInterval(errorInterval);
			}, 5000);
		}
	};
	return {
		isAuth,
		setIsAuth,
		loginAdm,
		errorLogin,
		setErrorLogin,
		error,
		setError,
		errorMessage,
		setErrorMessage,
		page,
		setPage,
		errorImg
	};
}
