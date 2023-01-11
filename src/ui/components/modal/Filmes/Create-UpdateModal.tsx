import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { CreateUpdateForm } from "../../form/Filmes/Create-UpdateForm";

export function CreateUpdateModal({...props}) {
  function toogleModal() {
    props.toggleModal()
  }

  return (
    <Modal isOpen = {props.isOpen}>
          <ModalHeader >Modal title</ModalHeader>
          <ModalBody>
            <CreateUpdateForm />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toogleModal}>Do Something</Button>
            <Button color="secondary" onClick={toogleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
  )
}