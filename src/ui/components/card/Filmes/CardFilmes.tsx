import { useState } from 'react';
import {
	Card,
	Button,
	CardTitle,
	CardText,
	CardImg,
	CardBody,
	CardSubtitle,
	CardFooter
} from 'reactstrap';

import { TagType } from '../../../../types/tagType';
import { Confirmation } from '../../modal/Confirmation/Confirmation';
import { UpdateModal } from '../../modal/Filmes/UpdateModal/UpdateModal';
import styles from './CardFilmes.module.css';

export function CardFilmes({ ...props }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
	const [message, setMessage] = useState('');

	function confirmDelete() {
		setMessage(`Quer mesmo deletar o Filme ${props.filme.title}?`);
		setIsOpenConfirmation(true);
	}

	function toogle() {
		setIsOpen(!isOpen);
	}

	function removeFilme() {
		props.deleteFilme(props.filme.id, props.filme.imageLink);
	}

	function updateFilme(
		titulo: string,
		tempoDeFilme: number,
		genero: number[],
		descricao: string,
		imagem: string,
		classificacao: string
	) {
		props.updateFilme(
			titulo,
			tempoDeFilme,
			genero,
			descricao,
			imagem,
			props.filme.id,
			props.filme.imageLink,
			classificacao
		);
	}

	function updateUrl(
		titulo: string,
		tempoDeFilme: number,
		genero: number[],
		descricao: string,
		newImage: File,
		classificacao: string
	) {
		props.updateUrl(
			props.filme.id,
			titulo,
			tempoDeFilme,
			genero,
			descricao,
			props.filme.imageLink,
			newImage,
			classificacao
		);
	}

	return (
		<div className={styles['card-container']}>
			<Card className={styles['card']}>
				<CardTitle className={styles['card-title']}>
					{props.filme.title}
				</CardTitle>
				<CardImg
					className={styles['card-img']}
					src={props.filme.imageLink}
					alt={props.filme.title}
				/>
				<CardBody>
					<CardSubtitle className={styles['card-subtitle']}>
						<strong>Gênero:</strong>
					</CardSubtitle>
					<div>
						<CardText className={styles['card-tags']}>
							{props.filme.tags.map((tag: TagType) => (
								<p key={tag.id} className={styles['card-tags-text']}>
									{tag.tag}
								</p>
							))}
						</CardText>
					</div>
					<CardText>
						<strong>Tempo de Filme: </strong> {props.filme.movieTime} minutos
					</CardText>
					<CardText>
						<strong>Classificação:</strong> {props.filme.classification}
					</CardText>
					<CardSubtitle className={styles['card-subtitle']}>
						<strong>Descrição:</strong>
					</CardSubtitle>
					<CardText>{props.filme.description}</CardText>
				</CardBody>
				<CardFooter className={styles['card-buttons']}>
					<Button
						color="none"
						className={styles['card-button-remove']}
						onClick={confirmDelete}
					>
						Detelar
					</Button>
					<Confirmation
						message={message}
						isOpenConfirmation={isOpenConfirmation}
						setIsOpenConfirmation={setIsOpenConfirmation}
						action={removeFilme}
					/>
					<Button
						color="none"
						className={styles['card-button-edit']}
						onClick={toogle}
					>
						Editar
					</Button>
					<UpdateModal
						isOpen={isOpen}
						toogle={toogle}
						updateFilme={updateFilme}
						updateUrl={updateUrl}
						filme={props.filme}
						tags={props.tags}
					/>
				</CardFooter>
			</Card>
		</div>
	);
}
