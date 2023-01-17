import { FormEvent, useState } from 'react';
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

import { FilmeType } from '../../../../../types/filmeType';
import { SalaType } from '../../../../../types/salaType';
import { Confirmation } from '../../Confirmation/Confirmation';
import styles from './CreateSessao.module.css';

export function CreateSessao({ ...props }) {
	const [filmeId, setFilmeId] = useState<number>();
	const [salaId, setSalaId] = useState<number>();
	const [init, setInit] = useState<string>();
	const [dateTime, setDateTime] = useState<Date>();
	const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
	const [message, setMessage] = useState('');

	function confirmSessao() {
		if (calcFinish() != null) {
			if (calcFinish()) {
				setMessage(`A sessão irá terminar depois das 23h`);
				setIsOpenConfirmation(true);
				return;
			} else createSessao();
		} else {
			setMessage(`Favor colocar novamente horário de inicio`);
			setIsOpenConfirmation(true);
		}
	}

	function createSessao() {
		setIsOpenConfirmation(false);
		props.setIsOpen(false);
		props.createSessao(salaId, filmeId, init);
	}

	function calcFinish() {
		const filme = getFilme();
		if (filme) {
			if (dateTime) {
				const hourFinish = new Date(
					dateTime.getTime() + filme.tempoDeFilme * 60000
				);
				if (
					hourFinish.getHours() > 22 ||
					hourFinish.getDate() != dateTime.getDate()
				)
					return true;
				return false;
			}
		}
		return null;
	}

	function getFilme() {
		let filme;
		for (let index = 0; index < props.filmes.length; index++) {
			if (props.filmes[index].id === filmeId) {
				filme = props.filmes[index];
			}
		}
		return filme;
	}

	function getFilmeId(e: FormEvent<HTMLInputElement>) {
		setFilmeId(+e.currentTarget.value);
	}

	function getSalaId(e: FormEvent<HTMLInputElement>) {
		setSalaId(+e.currentTarget.value);
	}

	function toogle() {
		props.setIsOpen(false);
	}

	function getInit(e: FormEvent<HTMLInputElement>) {
		const date = new Date(e.currentTarget.value);
		setDateTime(date);
		setInit(date.toISOString());
	}

	return (
		<Modal isOpen={props.isOpen}>
			<ModalHeader className={styles['modal-header']}>Criar Sessão</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<div className={styles['modal-select-filme']}>
							<Label>Filmes</Label>
							<Input type="select" onChange={getFilmeId} defaultValue={0}>
								<option value="0"></option>
								{props.filmes.map((filme: FilmeType) => (
									<option key={filme.id} value={filme.id}>
										{filme.titulo}
									</option>
								))}
							</Input>
						</div>
						<div className={styles['modal-select-sala']}>
							<Label>Salas</Label>
							<Input type="select" onChange={getSalaId} defaultValue={0}>
								<option value="0"></option>
								{props.salas.map((sala: SalaType) => (
									<option key={sala.id} value={sala.id}>
										Sala {sala.id}
									</option>
								))}
							</Input>
						</div>
						<div className={styles['modal-select-datetime']}>
							<Label>Data e Hora de Inicio</Label>
							<Input type="datetime-local" onChange={getInit} />
						</div>
						<div className={styles['modal-button-container']}>
							<Button
								onClick={confirmSessao}
								className={styles['modal-button']}
							>
								Criar
							</Button>
							<Confirmation
								message={message}
								isOpenConfirmation={isOpenConfirmation}
								setIsOpenConfirmation={setIsOpenConfirmation}
								action={createSessao}
							/>
						</div>
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
