/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { useApp } from './hooks/useApp';
import { Filmes } from './ui/pages/Filmes/Filmes';
import { Home } from './ui/pages/Home/Home';
import { Salas } from './ui/pages/Salas/Salas';
import { Sessao } from './ui/pages/Sessao/Sessao';
import { Tags } from './ui/pages/Tags/Tags';

function App() {
	const {
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
	} = useApp();
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<Home
							isAuth={isAuth}
							setIsAuth={setIsAuth}
							errorLogin={errorLogin}
							setErrorLogin={setErrorLogin}
							loginAdm={loginAdm}
							page={page}
							setPage={setPage}
							errorImg={errorImg}
						/>
					}
				/>
				<Route
					path="/salas"
					element={
						<Salas
							isAuth={isAuth}
							setIsAuth={setIsAuth}
							error={error}
							setError={setError}
							errorMessage={errorMessage}
							setErrorMessage={setErrorMessage}
							page={page}
							setPage={setPage}
							errorImg={errorImg}
						/>
					}
				/>
				<Route
					path="/filmes"
					element={
						<Filmes
							isAuth={isAuth}
							setIsAuth={setIsAuth}
							error={error}
							setError={setError}
							errorMessage={errorMessage}
							setErrorMessage={setErrorMessage}
							page={page}
							setPage={setPage}
							errorImg={errorImg}
						/>
					}
				/>
				<Route
					path="/tags"
					element={
						<Tags
							isAuth={isAuth}
							setIsAuth={setIsAuth}
							error={error}
							setError={setError}
							errorMessage={errorMessage}
							setErrorMessage={setErrorMessage}
							page={page}
							setPage={setPage}
							errorImg={errorImg}
						/>
					}
				/>
				<Route
					path="/sessoes"
					element={
						<Sessao
							isAuth={isAuth}
							setIsAuth={setIsAuth}
							error={error}
							setError={setError}
							errorMessage={errorMessage}
							setErrorMessage={setErrorMessage}
							page={page}
							setPage={setPage}
							errorImg={errorImg}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
