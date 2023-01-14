import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import styles from "./CreateModal.module.css"
import { UpdateForm } from "../../../form/Filmes/UpdateForm/UpdateForm";

export function UpdateModal({...props}) {

  function updateFilme(titulo: string, tempoDeFilme: number, genero: number[],
                        descricao: string, imagem: string|File, id: number) {
    props.updateFilme(titulo, tempoDeFilme, genero, descricao, imagem, id )
  }
  
  function updateUrl(titulo: string, tempoDeFilme: number, 
                        genero: number[],descricao: string, newImage:File){
      props.updateUrl(titulo, tempoDeFilme, genero,descricao, newImage);
    }
  
  

  function toogle() {
    props.toogle()
  }

  return (
    <Modal isOpen = {props.isOpen}>
      <ModalHeader >Modal title</ModalHeader>
        <ModalBody>
          <UpdateForm updateFilme={updateFilme} filme={props.filme} tags={props.tags} updateUrl={updateUrl}/>
        </ModalBody>
        <ModalFooter>
            <Button color="danger" onClick={toogle}>
              Sair
            </Button>
        </ModalFooter>
    </Modal>
  )
}