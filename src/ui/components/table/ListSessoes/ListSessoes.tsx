import { VscEdit, VscTrash } from "react-icons/vsc";
import { Button } from "reactstrap";
import styles from "./ListSessoes.module.css";
import { useState } from "react";
import { Confirmation } from "../../modal/Confirmation/Confirmation";
import { UpdateSessao } from "../../modal/Sessao/UpdateSessao/UpdateSessao";

export function ListSessoes({...props}){
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [message, setMessage] = useState('');
  const inicio = new Date(props.sessao.init);
  const fim = new Date(props.sessao.finish);

  function confirmDelete() {
    setMessage(`Quer mesmo deletar a Sessão ${props.sessao.id}?`);
    setIsOpenConfirmation(true);
  }

  function updateSessao(salaId: number, filmeId: number,init: string){
    props.updateSessao(salaId, filmeId, init, props.sessao.id);
  }

  function deleteSessao() {
    props.deleteSessao(props.sessao.id);
  }
  
  return (
        <> 
          <th scope="row"></th>
            <td>Sessao {props.sessao.id}</td>
            <td>{props.sessao.filme.titulo}</td>
            <td>{`${inicio.toLocaleDateString()} - ${inicio.getHours() < 10 ? '0'+ inicio.getHours():inicio.getHours()}: ${inicio.getMinutes()< 10 ? '0'+ inicio.getMinutes():inicio.getMinutes()}` }</td>
            <td>{`${fim.toLocaleDateString()} - ${fim.getHours() < 10 ? '0'+ fim.getHours():fim.getHours()}: ${fim.getMinutes()< 10 ? '0'+ fim.getMinutes():fim.getMinutes()}` }</td>
            <td>Sala {props.sessao.sala.id}</td>
            <td>{props.sessao.status}</td>
            <td>
            <Button color='none' className={styles['btn-remove']} onClick={confirmDelete}>
              <VscTrash color='red' className={styles['icon']}/>
              <Confirmation message={message} isOpenConfirmation={isOpenConfirmation} 
               setIsOpenConfirmation={setIsOpenConfirmation} action={deleteSessao}/>
            </Button>
            <Button color='none' className={styles['btn-edit']} onClick={()=> setIsOpen(true)}>
              <VscEdit color='black' className={styles['icon']}/>
              <UpdateSessao updateSessao={updateSessao} isOpen={isOpen} setIsOpen={setIsOpen} 
                sessao={props.sessao} filmes={props.filmes} salas={props.salas}/>
            </Button>
            </td>
        </>
  );
}