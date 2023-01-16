import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import styles from "./UpdateModal.module.css"
import { UpdateForm } from "../../../form/Filmes/UpdateForm/UpdateForm";

export function UpdateModal({...props}) {

  function updateFilme(titulo: string, tempoDeFilme: number, genero: number[], descricao: string, 
                        imagem: string, classificacao: string) {
    props.updateFilme(titulo, tempoDeFilme, genero, descricao, imagem, classificacao);
    toogle();
  }
  
  function updateUrl(titulo: string, tempoDeFilme: number, genero: number[], descricao: string,
                      newImage:File, classificacao: string){
      props.updateUrl(titulo, tempoDeFilme, genero, descricao, newImage, classificacao);
      toogle();
    }
  
  

  function toogle() {
    props.toogle();
  }

  return (
    <Modal isOpen={props.isOpen}>
      <ModalHeader  className={styles['modal-header']} >Modal title</ModalHeader>
        <ModalBody>
          <UpdateForm updateFilme={updateFilme} filme={props.filme} 
              tags={props.tags} updateUrl={updateUrl}/>
        </ModalBody>
        <ModalFooter>
            <Button color="danger" onClick={toogle}>
              Sair
            </Button>
        </ModalFooter>
    </Modal>
  )
}