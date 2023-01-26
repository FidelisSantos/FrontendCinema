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

import styles from './CreateSala.module.css';
import { AlertError } from '../../../alert/Alert/Alert';
import { AlertModalError } from '../../../alert/AlertModal/AlertModal';

export function CreateSala({ ...props }) {
	function createSala() {
		props.createSala();
	}

	function toogle() {
		props.setIsOpen(false);
	}

	return (
		<Modal isOpen={props.isOpen}>
			{!props.error && (
				<ModalHeader className={styles['modal-header']}>Criar Sala</ModalHeader>
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
							placeholder="Informe o nome da tag"
							required
							value={props.salaName}
							onChange={(e: any) => {
								props.setSalaName(e.target.value);
							}}
						/>
						<Button className={styles['modal-button']} onClick={createSala}>
							Criar
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
