import { useEffect } from 'react';
import { VscAdd } from 'react-icons/vsc';
import { ThreeCircles } from 'react-loader-spinner';
import { Navigate } from 'react-router-dom';
import { Table } from 'reactstrap';

import { AlertError } from '../../components/alert/Alert';
import { HeaderAdm } from '../../components/navbar/HeaderAdm/HeaderAdm';
import { ListSalas } from '../../components/table/ListSalas/ListSalas';
import { useSala } from './hooks/useSala';
import styles from './Sala.module.css';

export function Salas({ ...props }) {
	const {
		salas,
		loading,
		error,
		setError,
		getSalaList,
		createSala,
		deleteSala,
		errorMessage,
		setErrorMessage
	} = useSala();

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			setErrorMessage('token');
		}
		const getSalas = async () => {
			await getSalaList();
		};
		getSalas();

		props.setPage('salas');
	}, []);

	function setIsAuth() {
		props.setIsAuth(false);
	}

	function removeSala(id: number) {
		deleteSala(id);
	}

	if (error) {
		const errorTimeOut = setInterval(() => {
			setError(false);
			clearInterval(errorTimeOut);
		}, 5000);
	}

	return (
		<>
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
			{!loading && errorMessage == 'Erro ao Listar a sala' && (
				<div className={styles['erro-listagem']}>
					<img src={props.errorImg} alt="Error" />
				</div>
			)}
			{!loading && errorMessage != 'Erro ao Listar a sala' && (
				<>
					<div className={styles['table-salas-container']}>
						<Table className={styles['table-salas']}>
							<thead>
								<tr>
									<th>
										<button onClick={createSala}>
											<VscAdd />
										</button>
									</th>
									<th>Salas</th>
									<th>Status</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{salas.map((sala) => (
									<tr key={sala.id}>
										<ListSalas sala={sala} removeSala={removeSala} />{' '}
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</>
			)}
		</>
	);
}
