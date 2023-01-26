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

import styles from './UpdateTag.module.css';

export function UpdateTag({ ...props }) {
	const [tag, setTag] = useState();

	function updateTag() {
		props.updateTag(tag);
	}
	function toogle() {
		props.setIsOpen(false);
	}

	return (
		<Modal isOpen={props.isOpen}>
			<ModalHeader className={styles['modal-header']}>
				Atualizar Tag
			</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<Label>Tag</Label>
						<Input
							type="text"
							placeholder="Informe o nome do Gênero"
							required
							defaultValue={props.tag}
							value={tag}
							onChange={(e: any) => {
								setTag(e.target.value);
							}}
						/>
						<Button className={styles['modal-button']} onClick={updateTag}>
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
