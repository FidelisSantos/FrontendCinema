import { useState } from 'react';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import { Button } from 'reactstrap';

import { Confirmation } from '../../modal/Confirmation/Confirmation';
import { UpdateSessao } from '../../modal/Sessao/UpdateSessao/UpdateSessao';
import styles from './ListSessoes.module.css';

export function ListSessoes({ ...props }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
	const [message, setMessage] = useState('');
	const init = new Date(props.session.init);
	const finish = new Date(props.session.finish);

	function confirmDelete() {
		setMessage(`Quer mesmo deletar a Sessão ${props.session.id}?`);
		setIsOpenConfirmation(true);
	}

	function updateSessao(salaId: number, filmeId: number, init: string) {
		props.updateSessao(salaId, filmeId, init, props.session.id);
	}

	function deleteSessao() {
		props.deleteSessao(props.session.id);
	}

	return (
		<>
			<th scope="row"></th>
			<td>Sessao {props.session.id}</td>
			<td>{props.session.movie.title}</td>
			<td>{`${init.toLocaleDateString()} - ${
				init.getHours() < 10 ? '0' + init.getHours() : init.getHours()
			}: ${
				init.getMinutes() < 10 ? '0' + init.getMinutes() : init.getMinutes()
			}`}</td>
			<td>{`${finish.toLocaleDateString()} - ${
				finish.getHours() < 10 ? '0' + finish.getHours() : finish.getHours()
			}: ${
				finish.getMinutes() < 10
					? '0' + finish.getMinutes()
					: finish.getMinutes()
			}`}</td>
			<td>{props.session.room.name}</td>
			<td>{props.session.status}</td>
			<td>
				<Button
					color="none"
					className={styles['btn-remove']}
					onClick={confirmDelete}
				>
					<VscTrash color="red" className={styles['icon']} />
					<Confirmation
						message={message}
						isOpenConfirmation={isOpenConfirmation}
						setIsOpenConfirmation={setIsOpenConfirmation}
						action={deleteSessao}
					/>
				</Button>
				<Button
					color="none"
					className={styles['btn-edit']}
					onClick={() => setIsOpen(true)}
				>
					<VscEdit color="black" className={styles['icon']} />
					<UpdateSessao
						updateSessao={updateSessao}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						session={props.session}
						movies={props.movies}
						rooms={props.rooms}
					/>
				</Button>
			</td>
		</>
	);
}
