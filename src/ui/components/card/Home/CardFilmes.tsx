import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { useState } from 'react';
import { FilmeSessaoModal } from '../../modal/Home/FilmeSessaoModal/FilmeSessaoModal';
import { FilmeSessaoType } from '../../../../types/filmeSessaoType';
import styles from './CardFilmes.module.css';

export function CardFilmes(props: FilmeSessaoType) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return(  
    <div className={styles['card-container']}>
      <Card className={styles['card']}>
        <CardImg className={styles['card-img']} src={props.filme.linkImagem} alt={props.filme.titulo} />
        <CardBody>
          <CardTitle className={styles['card-title']}>{props.filme.titulo} </CardTitle>
          <CardSubtitle className={styles['card-subtitle']}><strong>Gênero:{process.env.REACT_APP_APIKEY}</strong></CardSubtitle>
          <CardText className={styles['card-tags']}>{props.filme.tags.map((tag) => 
            <p key={tag.id} className={styles['card-tags-text']}>{tag.tag}</p>)}</CardText>
          <CardText>Tempo de Filme: {props.filme.tempoDeFilme} minutos</CardText>
          <Button onClick={toggleModal} className={styles['card-button']}>Ver Mais</Button>
          {<FilmeSessaoModal filme={props.filme} sessoes={props.sessoes} toggleModal={toggleModal} isOpen={isOpen}/>}
        </CardBody>
      </Card>
    </div>
    );
}