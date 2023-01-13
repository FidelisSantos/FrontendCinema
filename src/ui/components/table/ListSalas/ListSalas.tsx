import { VscTrash } from "react-icons/vsc";
import styles from './ListSalas.module.css';
import { Button } from 'reactstrap';
import { Confirmation } from "../../modal/Confirmation/Confirmation";
import { useState } from "react";

export function ListSalas({...props}) {
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [message, setMessage] = useState('');

  function confirmDelete() {
    setMessage(`Quer mesmo deletar a Sala ${props.sala.id}?`);
    setIsOpenConfirmation(true);
  }

  function removeSala() {
    props.removeSala(props.sala.id)
  }
  return (
        <> 
          <th scope="row"></th>
            <td>Sala {props.sala.id}</td>
            <td>{props.sala.status}</td>
            <td>
              <Button onClick={confirmDelete} color='none' className={styles['btn-remove']}>
                <VscTrash color='red' className={styles['icon-remove']}/>
                <Confirmation message={message} isOpenConfirmation={isOpenConfirmation} 
               setIsOpenConfirmation={setIsOpenConfirmation} action={removeSala}/>
              </Button>
            </td>
          </>
  );
}