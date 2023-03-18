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

export function CreateSala({ ...props }) {
	function createSala() {
		props.createSala();
	}

	function toogle() {
		props.setIsOpen(false);
	}

	return (
		<Modal isOpen={props.isOpen}>
			<ModalHeader className={styles['modal-header']}>Criar Sala</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<Label>Nome da Sala</Label>
						<Input
							type="text"
							placeholder="Informe o nome da sala"
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
