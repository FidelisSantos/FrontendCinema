import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import styles from './FilmeSessaoModal.module.css';
import { HomeModalBodySessao } from './FilmeSessaoModalStatus/FilmeSessaoModalStatus';
import { SessionsMovieType } from '../../../../../types/sessionsMovieType';

export function FilmeSessaoModal({ ...props }) {
	function toggleModal() {
		props.toggleModal();
	}
	return (
		<Modal isOpen={props.isOpen}>
			<ModalHeader className={styles['modal-header']}>
				{props.movie.title.toUpperCase()}
			</ModalHeader>
			<ModalBody>
				<fieldset>
					<legend className={styles['legend-text']}>Descrição:</legend>
					<div className={styles['descricao-container']}>
						{props.movie.description}
					</div>
				</fieldset>
				<fieldset>
					<legend className={styles['legend-text']}>Próximas Sessoes:</legend>
					{props.session.map((session: SessionsMovieType) => (
						<div key={session.sessionId} className={'sessao-container'}>
							{session.status == 'Aguardando' && (
								<HomeModalBodySessao {...session} />
							)}
						</div>
					))}
				</fieldset>
				<fieldset>
					<legend className={styles['legend-text']}>Sessoes Rodando:</legend>
					{props.session.map((session: SessionsMovieType) => (
						<div key={session.sessionId}>
							{session.status == 'Rodando' && (
								<HomeModalBodySessao {...session} />
							)}
						</div>
					))}
				</fieldset>
				<fieldset>
					<legend className={styles['legend-text']}>
						Sessoes Finalizadas:
					</legend>
					{props.session.map((session: SessionsMovieType) => (
						<div key={session.sessionId}>
							{session.status == 'Terminado' && (
								<HomeModalBodySessao {...session} />
							)}
						</div>
					))}
				</fieldset>
			</ModalBody>
			<ModalFooter>
				<Button color="danger" onClick={toggleModal}>
					Sair
				</Button>
			</ModalFooter>
		</Modal>
	);
}
