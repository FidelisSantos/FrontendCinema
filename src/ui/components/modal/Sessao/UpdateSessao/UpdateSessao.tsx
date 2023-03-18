import { FormEvent, useState } from 'react';
import {
	Button,
	Form,
	FormGroup,
	FormText,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from 'reactstrap';

import { MovieType } from '../../../../../types/movieType';
import { RoomType } from '../../../../../types/roomType';
import { Confirmation } from '../../Confirmation/Confirmation';
import styles from './UpdateModal.module.css';

export function UpdateSessao({ ...props }) {
	const [filmeId, setFilmeId] = useState<number>();
	const [salaId, setSalaId] = useState<number>();
	const [init, setInit] = useState<string>();
	const [dateTime, setDateTime] = useState<Date>();
	const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
	const [message, setMessage] = useState('');
	const inicioSession = new Date(props.session.init);
	const finishSession = new Date(props.session.finish);
	const defaultValueTime = `${inicioSession.getFullYear()}-${
		inicioSession.getMonth() + 1 > 9
			? inicioSession.getMonth() + 1
			: '0' + (inicioSession.getMonth() + 1)
	}-${
		inicioSession.getDate() > 9
			? inicioSession.getDate()
			: '0' + inicioSession.getDate()
	}T${
		inicioSession.getHours() > 9
			? inicioSession.getHours()
			: '0' + inicioSession.getHours()
	}:${
		inicioSession.getMinutes() > 9
			? inicioSession.getMinutes()
			: '0' + inicioSession.getMinutes()
	}`;
	console.log(defaultValueTime, 'default');

	async function confirmSessao() {
		setDateTime(dateTime ? dateTime : inicioSession);
		setFilmeId(filmeId ? filmeId : props.session.movie.id);
		const validationHour = calcFinish();
		if (validationHour != null) {
			if (validationHour) {
				setMessage(`A sessão irá terminar depois das 23h`);
				setIsOpenConfirmation(true);
			} else updateSessao();
		}
		return;
	}

	function updateSessao() {
		setIsOpenConfirmation(false);
		props.setIsOpen(false);
		const sala = salaId ? salaId : (props.session.room.id as number);
		const filme = filmeId ? filmeId : (props.session.movie.id as number);
		const initSessao = init ? init : props.session.init;
		props.updateSessao(sala, filme, initSessao);
	}

	function calcFinish() {
		let filme = getFilme();
		filme = filme ? filme : props.session.movie;
		if (filme) {
			const date = dateTime ? dateTime : inicioSession;
			if (date) {
				const hourFinish = new Date(date.getTime() + filme.movieTime * 60000);
				if (
					hourFinish.getHours() > 22 ||
					hourFinish.getDate() != date.getDate()
				)
					return true;
				return false;
			}
		}
		return null;
	}

	function getFilme() {
		let filme;
		for (let index = 0; index < props.movies.length; index++) {
			if (props.movies[index].id === filmeId) {
				filme = props.movies[index];
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
			<ModalHeader className={styles['modal-header']}>
				Sessao {props.session.id}
			</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<div className={styles['modal-select-filme']}>
							<Label>Filmes</Label>
							<Input
								type="select"
								onChange={getFilmeId}
								defaultValue={props.session.movie.id}
							>
								<option value="0"></option>
								{props.movies.map((movie: MovieType) => (
									<option key={movie.id} value={movie.id}>
										{movie.title}
									</option>
								))}
							</Input>
						</div>
						<div className={styles['modal-select-sala']}>
							<Label>Salas</Label>
							<Input
								type="select"
								onChange={getSalaId}
								defaultValue={props.session.room.id}
							>
								<option value="0"></option>
								{props.rooms.map((room: RoomType) => (
									<option key={room.id} value={room.id}>
										{room.name}
									</option>
								))}
							</Input>
						</div>
						<div className={styles['modal-select-datetime']}>
							<Label>Hora e Data de Inicio</Label>
							<Input
								type="datetime-local"
								onChange={getInit}
								defaultValue={defaultValueTime}
							/>
						</div>
						<div className={styles['modal-button-container']}>
							<Button
								onClick={confirmSessao}
								className={styles['modal-button']}
							>
								Atualizar
							</Button>
							<Confirmation
								message={message}
								isOpenConfirmation={isOpenConfirmation}
								setIsOpenConfirmation={setIsOpenConfirmation}
								action={updateSessao}
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
