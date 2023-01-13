import { useState } from 'react';
import { TagType } from '../../../../types/tagType';
import styles from './CardFilmes.module.css';
import { Card, Button, CardTitle, CardText, CardImg, CardBody, CardSubtitle, CardFooter } from 'reactstrap';
import { UpdateModal } from '../../modal/Filmes/UpdateModal/UpdateModal';
import { Confirmation } from '../../modal/Confirmation/Confirmation';


export function CardFilmes({...props}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [message, setMessage] = useState('');

  function confirmDelete() {
    setMessage(`Quer mesmo deletar o Filme ${props.filme.titulo}?`);
    setIsOpenConfirmation(true);
  }

  function toogle() {
    console.log('toogle')
    setIsOpen(!isOpen);
  }

  function removeFilme() {
    console.log('remove')
    props.deleteFilme(props.filme.id);
  }

  function updateFilme(titulo: string, tempoDeFilme: number, genero: number[],
                          descricao: string, imagem: string|File, id: number) {
    props.updateFilme(titulo, tempoDeFilme, genero, descricao, imagem, id)
  }

  return (
    <div className={styles['card-container']}>
      <Card className={styles['card']}>
          <CardTitle className={styles['card-title']}>{props.filme.titulo}</CardTitle>
        <CardImg className={styles['card-img']} src={props.filme.linkImagem} alt={props.filme.titulo} />
        <CardBody>
          <CardSubtitle className={styles['card-subtitle']}><strong>Gênero:</strong></CardSubtitle>
          <div>
            <CardText className={styles['card-tags']}>{props.filme.tags.map((tag:TagType) => 
                <p key={tag.id} className={styles['card-tags-text']}>{tag.tag}</p>)}</CardText>
          </div>
          <CardText><strong>Tempo de Filme: </strong> {props.filme.tempoDeFilme} minutos</CardText>
          <CardSubtitle className={styles['card-subtitle']}><strong>Descrição:</strong></CardSubtitle>
          <CardText>{props.filme.descricao} minutos</CardText>
        </CardBody>
        <CardFooter className={styles['card-buttons']}>
          <Button color='none' className={styles['card-button-remove']} onClick={confirmDelete}>
            Detelar
          </Button>
          <Confirmation message={message} isOpenConfirmation={isOpenConfirmation} 
               setIsOpenConfirmation={setIsOpenConfirmation} action={removeFilme}/>
          <Button color='none' className={styles['card-button-edit']} onClick={toogle}>
            Editar
          </Button>
          <UpdateModal isOpen={isOpen} toogle={toogle} updateFilme={updateFilme} filme={props.filme} tags={props.tags}/>
        </CardFooter>
      </Card>
    </div>
  );
}