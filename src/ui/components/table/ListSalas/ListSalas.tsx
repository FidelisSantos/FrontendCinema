import { VscTrash } from "react-icons/vsc";
import styles from './ListSalas.module.css';
import { Button } from 'reactstrap';

export function ListSalas({...props}) {
  function removeSala() {
    props.removeSala(props.sala.id)
  }
  return (
        <> 
          <th scope="row"></th>
            <td>Sala {props.sala.id}</td>
            <td>{props.sala.status}</td>
            <Button onClick={removeSala} color='none' className={styles['btn-remove']}>
              <VscTrash color='red' className={styles['icon-remove']}/>
            </Button>
          </>
  );
}