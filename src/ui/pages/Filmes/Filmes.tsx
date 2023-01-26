import { useEffect } from 'react';
import { VscAdd } from 'react-icons/vsc';
import { ThreeCircles } from 'react-loader-spinner';
import { Navigate } from 'react-router-dom';
import { Button, Input } from 'reactstrap';

import { CardFilmes } from '../../components/card/Filmes/CardFilmes';
import { CreateModal } from '../../components/modal/Filmes/CreateModal/CreateModal';
import { HeaderAdm } from '../../components/navbar/HeaderAdm/HeaderAdm';
import styles from './Filmes.module.css';
import { useFilmes } from './hooks/useFilmes';
import { AlertError } from '../../components/alert/Alert/AlertModal';

export function Filmes({ ...props }) {
	const {
		filmes,
		loading,
		error,
		setError,
		getFilmesList,
		deleteFilme,
		createFilme,
		isOpen,
		setIsOpen,
		tags,
		updateFilme,
		errorMessage,
		setErrorMessage,
		createUrl,
		updateUrl,
		searchFilme,
		isDisabled,
		search,
		setSearch
	} = useFilmes();

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			setErrorMessage('token');
		}

		props.setPage('filmes');

		const listFilme = async () => {
			await getFilmesList();
		};
		listFilme();
	}, []);

	function setIsAuth() {
		localStorage.removeItem('token');
		props.setIsAuth(false);
	}

	function toogleModal() {
		setIsOpen(!isOpen);
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
				<HeaderAdm
					isAuth={props.isAuth}
					setIsAuth={setIsAuth}
					error={props.error}
					setError={props.setError}
					errorMessage={props.errorMessage}
					setErrorMessage={props.setErrorMessage}
					page={props.page}
				/>
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
			{(!loading && errorMessage == 'token') ||
				(!localStorage.getItem('token') && (
					<Navigate to={'/'} state={props.setIsAuth(false)} />
				))}
			{!loading && errorMessage == 'Erro ao Listar os Filmes' && (
				<div className={styles['erro-listagem']}>
					<img src={props.errorImg} alt="Error" />
				</div>
			)}
			{!loading && errorMessage != 'Erro ao Listar a sala' && (
				<>
					<div className={styles['filmes']}>
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
									onClick={() => searchFilme(search)}
								>
									Pesquisar
								</Button>
							)}
							{isDisabled && (
								<Button
									className={styles['btn-reset']}
									onClick={() => {
										getFilmesList();
										setSearch('');
									}}
								>
									Limpar
								</Button>
							)}
						</div>
						<button onClick={toogleModal} className={styles['add-button']}>
							<VscAdd />
						</button>
						<CreateModal
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							tags={tags}
							createFilme={createFilme}
							createUrl={createUrl}
						/>
					</div>
					<div className={styles['filmes-container']}>
						{filmes.map((filme) => (
							<CardFilmes
								key={filme.id}
								deleteFilme={deleteFilme}
								filme={filme}
								updateFilme={updateFilme}
								tags={tags}
								updateUrl={updateUrl}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}
