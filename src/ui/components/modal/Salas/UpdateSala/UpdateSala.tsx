import { useState } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from 'reactstrap';

import { AlertModalError } from '../../../alert/AlertModal/AlertModal';
import styles from './UpdateSala.module.css';

export function UpdateSala({ ...props }) {
	const [newName, setNewName] = useState(props.name);

	function updateSala() {
		props.updateSala(newName);
	}
	function toogle() {
		props.setIsOpen(false);
	}

	return (
		<Modal isOpen={props.isOpen}>
			{!props.error && (
				<ModalHeader className={styles['modal-header']}>Atualizar</ModalHeader>
			)}
			{props.error && (
				<AlertModalError
					error={props.error}
					setError={props.setError}
					errorMessage={props.errorMessage}
				/>
			)}
			<ModalBody>
				<Form>
					<FormGroup>
						<Label>Nome da Sala</Label>
						<Input
							type="text"
							placeholder="Informe o nome da Sala"
							required
							defaultValue={props.sala}
							value={newName}
							onChange={(e: any) => {
								setNewName(e.target.value);
							}}
						/>
						<Button className={styles['modal-button']} onClick={updateSala}>
							Atualizar
						</Button>
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button color="danger" onClick={toogle}>
					Sair
				</Button>
			</ModalFooter>
		</Modal>
	);
}
