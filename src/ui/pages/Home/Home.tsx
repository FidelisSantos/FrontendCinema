import { ThreeCircles } from 'react-loader-spinner';
import { Button, Input } from 'reactstrap';

import { CardFilmes } from '../../components/card/Home/CardFilmes';
import { HeaderAdm } from '../../components/navbar/HeaderAdm/HeaderAdm';
import { HeaderVisitor } from '../../components/navbar/HeaderVisitor/HeaderVisitor';
import styles from './Home.module.css';
import { useHome } from './hooks/useHome';
import { AlertError } from '../../components/alert/Alert/AlertModal';

export function Home({ ...props }) {
	const {
		movieSessions,
		loading,
		getFilmeSessoes,
		search,
		setSearch,
		searchFilmeSessao,
		isDisabled,
		error,
		errorMessage,
		setError
	} = useHome();
	props.setPage('home');

	function setIsAuth() {
		props.setIsAuth();
	}

	function setErrorLogin() {
		props.setErrorLogin();
	}

	function loginAdm(email: string, password: string) {
		props.loginAdm(email, password);
	}

	if (error) {
		const errorTimeOut = setInterval(() => {
			setError(false);
			clearInterval(errorTimeOut);
		}, 5000);
	}

	return (
		<div>
			<div className={styles['header-container']}>
				{!localStorage.getItem('token') && (
					<HeaderVisitor
						isAuth={props.isAuth}
						setIsAuth={setIsAuth}
						loginAdm={loginAdm}
						errorLogin={props.errorLogin}
						setErrorLogin={setErrorLogin}
					/>
				)}
				{localStorage.getItem('token') && (
					<HeaderAdm
						isAuth={props.isAuth}
						setIsAuth={setIsAuth}
						loginAdm={loginAdm}
						errorLogin={props.errorLogin}
						setErrorLogin={setErrorLogin}
						page={props.page}
					/>
				)}
				<div className={styles['alert-container']}>
					<AlertError
						error={error}
						setError={setError}
						errorMessage={errorMessage}
					/>
				</div>
			</div>
			{loading && (
				<div className={styles['loader-container']}>
					<ThreeCircles
						height="100"
						width="100"
						color="#000000"
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
						ariaLabel="three-circles-rotating"
						outerCircleColor=""
						innerCircleColor=""
						middleCircleColor=""
					/>
				</div>
			)}
			{!loading && errorMessage == 'Erro ao listar sessões' && (
				<div className={styles['erro-listagem']}>
					<img src={props.errorImg} alt="Error" />
				</div>
			)}
			{!loading && errorMessage != 'Erro ao listar sessões' && (
				<div className={styles['home-container']}>
					<div className={styles['search-container']}>
						<Input
							className={styles['search-input']}
							type="search"
							onChange={(e: any) => setSearch(e.currentTarget.value)}
							disabled={isDisabled}
							value={search}
							placeholder="Pesquisa"
						/>
						{!isDisabled && (
							<Button
								className={styles['btn-search']}
								onClick={() => searchFilmeSessao(search)}
							>
								Pesquisar
							</Button>
						)}
						{isDisabled && (
							<Button
								className={styles['btn-reset']}
								onClick={() => {
									getFilmeSessoes();
									setSearch('');
								}}
							>
								Limpar
							</Button>
						)}
					</div>
					{errorMessage != 'Nenhum filme encontrado' && (
						<div className={styles['card-container']}>
							{movieSessions != null &&
								movieSessions.map((movieSession) => (
									<div key={movieSession.movie.id}>
										<CardFilmes {...movieSession} />
									</div>
								))}
						</div>
					)}
					{errorMessage == 'Nenhum filme encontrado' && (
						<h1 className={styles['error-search']}>{errorMessage}</h1>
					)}
					{errorMessage == 'Não há filmes em cartaz' && (
						<h1 className={styles['error-search']}>{errorMessage}</h1>
					)}
				</div>
			)}
		</div>
	);
}
