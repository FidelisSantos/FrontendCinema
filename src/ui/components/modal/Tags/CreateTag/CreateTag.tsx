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

import styles from './CreateTag.module.css';

export function CreateTag({ ...props }) {
	const [tag, setTag] = useState();

	function createTag() {
		props.createTag(tag);
		props.setIsOpen(false);
	}

	function toogle() {
		props.setIsOpen(false);
	}

	return (
		<Modal isOpen={props.isOpen}>
			<ModalHeader className={styles['modal-header']}>Criar Tag</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<Label>Tag</Label>
						<Input
							type="text"
							placeholder="Informe o nome da tag"
							required
							value={tag}
							onChange={(e: any) => {
								setTag(e.target.value);
							}}
						/>
						<Button className={styles['modal-button']} onClick={createTag}>
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
