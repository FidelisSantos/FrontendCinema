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

import { AlertModalError } from '../../../alert/AlertModal/Alert';
import styles from './UpdateSala.module.css';

export function UpdateSala({ ...props }) {
	const [newName, setNewName] = useState();
	function updateSala() {
		props.updateSala(newName);
		props.setIsOpen(true);
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
							defaultValue={props.sala.name}
							onChange={(e: any) => {
								setNewName(e.target.value);
							}}
							required
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
