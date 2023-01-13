import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import styles from "./ViewImg.module.css";

export function ViewImg({...props}) {
  function toogle(){
    props.setIsOpen(false);
  }

  return (
    <Modal isOpen = {props.isOpen} className={styles['modal-container']}>
    <ModalHeader className={styles['modal-title']}>{props.titulo.toUpperCase()}</ModalHeader>
    <ModalBody className={styles['modal-body']}>
     <img src={props.link} alt={props.titulo} />
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={toogle}>Cancel</Button>
    </ModalFooter>
  </Modal>
  );
}