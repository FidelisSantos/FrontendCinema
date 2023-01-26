import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { CreateForm } from '../../../form/Filmes/CreateForm/CreateForm';
import styles from './CreateModal.module.css';

export function CreateModal({ ...props }) {
	function createFilme(
		titulo: string,
		tempoDeFilme: number,
		genero: number[],
		descricao: string,
		imagem: string,
		classificacao: string
	) {
		props.createFilme(
			titulo,
			tempoDeFilme,
			genero,
			descricao,
			imagem,
			classificacao
		);
		toogle();
	}

	function createUrl(
		imagem: File,
		titulo: string,
		tempoDeFilme: number,
		genero: number[],
		descricao: string,
		classificacao: string
	) {
		props.createUrl(
			imagem,
			titulo,
			tempoDeFilme,
			genero,
			descricao,
			classificacao
		);
		toogle();
	}

	function toogle() {
		props.setIsOpen(false);
	}

	return (
		<Modal isOpen={props.isOpen}>
			<ModalHeader className={styles['modal-header']}>Criar Filme</ModalHeader>
			<ModalBody>
				<CreateForm
					tags={props.tags}
					createFilme={createFilme}
					createUrl={createUrl}
				/>
			</ModalBody>
			<ModalFooter>
				<Button color="danger" onClick={toogle}>
					Sair
				</Button>
			</ModalFooter>
		</Modal>
	);
}
