import { useState } from 'react';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import { Button } from 'reactstrap';

import { Confirmation } from '../../modal/Confirmation/Confirmation';
import { UpdateSala } from '../../modal/Salas/UpdateSala/UpdateSala';
import styles from './ListSalas.module.css';

export function ListSalas({ ...props }) {
	const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
	const [message, setMessage] = useState('');

	function confirmDelete() {
		setMessage(`Quer mesmo deletar a Sala ${props.sala.id}?`);
		setIsOpenConfirmation(true);
	}

	function updateSala(name: string) {
		props.updateSala(props.sala.id, name);
	}

	function removeSala() {
		props.removeSala(props.sala.id);
	}
	return (
		<>
			<th scope="row"></th>
			<td>{props.sala.name}</td>
			<td>{props.sala.status}</td>
			<td>
				<Button
					onClick={confirmDelete}
					color="none"
					className={styles['btn-remove']}
				>
					<VscTrash color="red" className={styles['icon-remove']} />
					<Confirmation
						message={message}
						isOpenConfirmation={isOpenConfirmation}
						setIsOpenConfirmation={setIsOpenConfirmation}
						action={removeSala}
					/>
				</Button>
				<Button
					color="none"
					className={styles['btn-edit']}
					onClick={() => props.setIsOpenUpdate(true)}
				>
					<VscEdit color="black" className={styles['icon']} />
				</Button>
				<UpdateSala
					isOpen={props.isOpenUpdate}
					setIsOpen={props.setIsOpenUpdate}
					updateSala={updateSala}
					sala={props.sala.name}
					error={props.error}
					setError={props.setError}
					errorMessage={props.errorMessage}
				/>
			</td>
		</>
	);
}
