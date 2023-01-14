import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import styles from "./CreateModal.module.css"
import { CreateForm } from "../../../form/Filmes/CreateForm/CreateForm";

export function CreateModal({...props}) {

  function createFilme(titulo: string, tempoDeFilme: number, genero: number[],descricao: string, imagem: string) {
    props.createFilme(titulo, tempoDeFilme, genero, descricao, imagem)
  }

  function createUrl(imagem: File, titulo: string, tempoDeFilme: number, genero: number[],descricao: string) {
    props.createUrl(imagem, titulo, tempoDeFilme, genero, descricao);
  }

  function toogle() {
    props.setIsOpen(false)
  }

  return (
    <Modal isOpen = {props.isOpen}>
      <ModalHeader >Modal title</ModalHeader>
        <ModalBody>
          <CreateForm tags={props.tags} createFilme={createFilme} createUrl={createUrl}/>
        </ModalBody>
        <ModalFooter>
            <Button color="danger" onClick={toogle}>Sair</Button>
        </ModalFooter>
    </Modal>
  )
}