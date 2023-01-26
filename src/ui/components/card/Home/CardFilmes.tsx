import { useState } from 'react';
import {
	Button,
	Card,
	CardBody,
	CardImg,
	CardSubtitle,
	CardText,
	CardTitle
} from 'reactstrap';

import { MovieSessionsType } from '../../../../types/movieSessionsType';
import { FilmeSessaoModal } from '../../modal/Home/FilmeSessaoModal/FilmeSessaoModal';
import styles from './CardFilmes.module.css';

export function CardFilmes(props: MovieSessionsType) {
	const [isOpen, setIsOpen] = useState(false);

	function toggleModal() {
		setIsOpen(!isOpen);
	}

	return (
		<div className={styles['card-container']}>
			<Card className={styles['card']}>
				<CardImg
					className={styles['card-img']}
					src={props.movie.imageLink}
					alt={props.movie.title}
				/>
				<CardBody>
					<CardTitle className={styles['card-title']}>
						{props.movie.title}{' '}
					</CardTitle>
					<CardSubtitle className={styles['card-subtitle']}>
						<strong>Tags:</strong>
					</CardSubtitle>
					<CardText className={styles['card-tags']}>
						{props.movie.tags.map((tag) => (
							<p key={tag.id} className={styles['card-tags-text']}>
								{tag.tag}
							</p>
						))}
					</CardText>
					<CardText>
						<strong>Tempo de Filme: </strong> {props.movie.movieTime} minutos
					</CardText>
					<CardText>
						<strong>Classificação:</strong> {props.movie.classification}
					</CardText>
					<Button onClick={toggleModal} className={styles['card-button']}>
						Ver Mais
					</Button>
					{
						<FilmeSessaoModal
							movie={props.movie}
							session={props.sessions}
							toggleModal={toggleModal}
							isOpen={isOpen}
						/>
					}
				</CardBody>
			</Card>
		</div>
	);
}
