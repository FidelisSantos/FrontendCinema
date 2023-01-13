import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useState } from 'react';


export function UpdateTag({...props}) {
  const [tag, setTag] = useState();

  function updateTag() {
    props.updateTag(tag);
  }
  function toogle() {
    props.setIsOpen(false)
  }

  return (
    <Modal isOpen = {props.isOpen}>
      <ModalHeader >Modal title</ModalHeader>
        <ModalBody>
        <Form >
          <FormGroup>
            <Label>Genêro</Label>
            <Input type="text"  
              placeholder="Informe o nome do Gênero" 
              required
              defaultValue={props.tag}
              value={tag}
              onChange={(e: any) =>{
              setTag(e.target.value)
              } 
                }
              />
            <Button onClick={updateTag}>Atualizar</Button>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={toogle}>Sair</Button>
      </ModalFooter>
    </Modal>
    )
}