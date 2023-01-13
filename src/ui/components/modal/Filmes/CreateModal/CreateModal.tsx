import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import styles from "./CreateModal.module.css"
import { CreateForm } from "../../../form/Filmes/CreateForm/CreateForm";

export function CreateModal({...props}) {

  function createFilme(titulo: string, tempoDeFilme: number, genero: number[],descricao: string, imagem: string|File) {
    props.createFilme(titulo, tempoDeFilme, genero, descricao, imagem)
  }
  function toogle() {
    props.setIsOpen(false)
  }

  return (
    <Modal isOpen = {props.isOpen}>
      <ModalHeader >Modal title</ModalHeader>
        <ModalBody>
          <CreateForm tags={props.tags} createFilme={createFilme}/>
        </ModalBody>
        <ModalFooter>
            <Button color="danger" onClick={toogle}>Sair</Button>
        </ModalFooter>
    </Modal>
  )
}