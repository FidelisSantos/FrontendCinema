import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

import { HomeModalBodySessao } from './FilmeSessaoModalStatus/FilmeSessaoModalStatus';
import styles from './FilmeSessaoModal.module.css';
import { SessaoFilmeSessao } from '../../../../../types/sessaoFilmeSessaoType';

export function FilmeSessaoModal({...props}, sessoes: SessaoFilmeSessao[]) {

  console.log(props.sessoes);
  
  function toggleModal() {
    props.toggleModal();
  }
  return (
    <Modal isOpen={props.isOpen} >
    <ModalHeader className={styles['modal-header']}>{props.filme.titulo.toUpperCase()}</ModalHeader>
    <ModalBody>
      <fieldset>
        <legend className={styles['legend-text']}>Descrição:</legend>
        {props.filme.descricao}
      </fieldset>
      <fieldset>
        <legend className={styles['legend-text']}>Próximas Sessoes:</legend>
        {props.sessoes.map((sessao:SessaoFilmeSessao)=> 
        <div key={sessao.sessaoId} className={'sessao-container'}>
          {sessao.status == 'Aguardando' && 
        <HomeModalBodySessao {...sessao}/>}</div> )}
      </fieldset>
      <fieldset>
        <legend className={styles['legend-text']}>Sessoes Rodando:</legend>
        {props.sessoes.map((sessao:SessaoFilmeSessao)=> 
        <div key={sessao.sessaoId}>{sessao.status == 'Rodando' && 
        <HomeModalBodySessao {...sessao}/>}</div> )}
      </fieldset>
      <fieldset>
        <legend className={styles['legend-text']}>Sessoes Finalizadas:</legend>
        {props.sessoes.map((sessao:SessaoFilmeSessao)=> 
        <div key={sessao.sessaoId}>{sessao.status == 'Terminado' && 
        <HomeModalBodySessao {...sessao}/>}</div> )}
      </fieldset>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={toggleModal}>Cancel</Button>
    </ModalFooter>
  </Modal>
  );
}