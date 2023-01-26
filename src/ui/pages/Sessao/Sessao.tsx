import { useEffect } from 'react';
import { VscAdd } from 'react-icons/vsc';
import { ThreeCircles } from 'react-loader-spinner';
import { Navigate } from 'react-router-dom';
import { Button, Input, Table } from 'reactstrap';

import { CreateSessao } from '../../components/modal/Sessao/CreateSessao/CreateSessao';
import { HeaderAdm } from '../../components/navbar/HeaderAdm/HeaderAdm';
import { ListSessoes } from '../../components/table/ListSessoes/ListSessoes';
import { useSessao } from './hooks/useSessao';
import styles from './Sessao.module.css';
import { AlertError } from '../../components/alert/Alert/Alert';

export function Sessao({ ...props }) {
	const {
		loading,
		sessions,
		error,
		setError,
		getSessoesList,
		isOpen,
		setIsOpen,
		deleteSessao,
		rooms,
		movies,
		createSessao,
		updateSessao,
		errorMessage,
		setErrorMessage,
		searchSessao,
		isDisabled,
		setIsDisabled
	} = useSessao();

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			setErrorMessage('token');
		}
		props.setPage('sessoes');

		const listSessoes = async () => {
			await getSessoesList();
		};
		listSessoes();
	}, []);

	function setIsAuth() {
		localStorage.removeItem('token');
		props.setIsAuth(false);
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
			{!loading && errorMessage == 'Erro ao Listar as sessões' && (
				<div className={styles['erro-listagem']}>
					<img src={props.errorImg} alt="Error" />
				</div>
			)}
			{!loading && errorMessage != 'Erro ao Listar as sessões' && (
				<div className={styles['sessao-container']}>
					<div className={styles['table-sessao-container']}>
						<Table className={styles['table-sessao']}>
							<thead className={styles['thead-sessao']}>
								<tr>
									<th>
										<button onClick={() => setIsOpen(true)}>
											<VscAdd />
										</button>
									</th>
									<CreateSessao
										setIsOpen={setIsOpen}
										isOpen={isOpen}
										movies={movies}
										rooms={rooms}
										createSessao={createSessao}
									/>
									<th>Sessões</th>
									<th>Filme</th>
									<th>Inicio</th>
									<th>Fim</th>
									<th>Sala</th>
									<th>Status</th>
									<th>
										<div className={styles['search-container']}>
											<Input
												className={styles['search-container-input']}
												type="select"
												onChange={searchSessao}
												defaultValue={0}
												disabled={isDisabled}
											>
												<option value="0"> Todas Salas</option>
												{rooms.map((room) => (
													<option key={room.id} value={room.id}>
														{room.name}
													</option>
												))}
											</Input>
											{isDisabled && (
												<Button
													color="danger"
													onClick={() => {
														getSessoesList();
														setIsDisabled(false);
													}}
												>
													Limpar
												</Button>
											)}
										</div>
									</th>
								</tr>
							</thead>
							<tbody>
								{sessions.map((session) => (
									<tr key={session.id}>
										<ListSessoes
											session={session}
											deleteSessao={deleteSessao}
											updateSessao={updateSessao}
											movies={movies}
											rooms={rooms}
										/>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</div>
			)}
		</div>
	);
}
