import { FormEvent, useState } from "react";
import { Button, Form, FormGroup, FormText, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FilmeType } from "../../../../../types/filmeType";
import { SalaType } from "../../../../../types/salaType";
import { Confirmation } from "../../Confirmation/Confirmation";
import styles from "./UpdateModal.module.css"



export function UpdateSessao({...props}) {
  const [filmeId, setFilmeId] = useState<number>();
  const [salaId, setSalaId] = useState<number>();
  const [init, setInit] = useState<string>();
  const [dateTime, setDateTime] = useState<Date>();
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [message, setMessage] = useState('');
  const inicio = new Date(props.sessao.init);
  const fim = new Date(props.sessao.finish);

  async function confirmSessao() {
  await setDateTime( dateTime? dateTime: inicio);
   await setFilmeId(filmeId ? filmeId :props.sessao.filme.id);
    const validationHour = calcFinish();
    console.log(validationHour)
    if(validationHour != null){
      if(validationHour){
        console.log('entrei abrir modal')
        setMessage(`A sessão irá terminar depois das 23h`);
        setIsOpenConfirmation(true);
        return
      }
      updateSessao()
    }
    return
  }


  function updateSessao() {
    setIsOpenConfirmation(false);
    props.setIsOpen(false);
    const sala = salaId ? salaId: props.sessao.sala.id as number;
    const filme = filmeId ? filmeId: props.sessao.filme.id as number;
    const initSessao = init ? init: props.sessao.init;
    console.log('entrei')
    console.log(sala, filme, initSessao)
    props.updateSessao(sala,filme, initSessao);
  }

  function calcFinish() {
    let filme = getFilme();
    filme = filme ? filme : props.sessao.filme;
    if(filme){
      const date = dateTime? dateTime:inicio;
      if(date){
        const hourFinish = 
          new Date(date.getTime() + (filme.tempoDeFilme * 60000));
        console.log(hourFinish);
        if(hourFinish.getHours() > 22 || hourFinish.getDate() != date.getDate())
          return true;
        return false;
      }
    }
    return null;
  }

  function getFilme(){
    let filme;
    console.log(filmeId)
    for (let index = 0; index < props.filmes.length; index++) {
      if(props.filmes[index].id ===filmeId){
        filme = props.filmes[index];
      }
    }
    return filme;
  }

  function getFilmeId(e: FormEvent<HTMLInputElement>) {
    console.log(filmeId, +e.currentTarget.value)
    setFilmeId(+e.currentTarget.value)
  }

  function getSalaId(e: FormEvent<HTMLInputElement>) {
    setSalaId(+e.currentTarget.value)
    console.log(salaId,+e.currentTarget.value )
  }

  function toogle() {
    props.setIsOpen(false)
  }

  function getInit(e:FormEvent<HTMLInputElement>) {
    console.log(e.currentTarget.value)
    const date = new Date(e.currentTarget.value);
    setDateTime(date);
    setInit(date.toISOString());
    console.log(date);
  }

  return (
    <Modal isOpen = {props.isOpen}>
      <ModalHeader className={styles['modal-header']}>Sessao {props.sessao.id}</ModalHeader>
        <ModalBody>
        <Form >
          <FormGroup>
            <div className={styles['modal-select-filme']}>
              <Label>Filmes</Label>
              <Input type="select" onChange={getFilmeId} defaultValue={props.sessao.filme.id}>
                <option value="0"></option>
                {props.filmes.map((filme: FilmeType)=> 
                  <option key={filme.id} value={filme.id}>{filme.titulo}</option>)}
              </Input>
            </div> 
            <div className={styles['modal-select-sala']}>
              <Label>Salas</Label>
              <Input type="select" onChange={getSalaId} defaultValue={props.sessao.sala.id}>
              <option value="0"></option>
              {props.salas.map((sala: SalaType)=> 
                  <option key={sala.id} value={sala.id}>Sala {sala.id}</option>)}
              </Input>
            </div>
            <div className={styles['modal-select-datetime']}>
              <Label>Hora e Data de Inicio</Label>
              <Input type="datetime-local" onChange={getInit}/>
              <FormText color="muted">
              {`Sessão atual -> Inicio: ${inicio.toLocaleDateString()} - ${inicio.getHours() < 10 ? '0'+ inicio.getHours():inicio.getHours()}: ${inicio.getMinutes()< 10 ? '0'+ inicio.getMinutes():inicio.getMinutes()}  
                Fim: ${fim.toLocaleDateString()} - ${fim.getHours() < 10 ? '0'+ fim.getHours():fim.getHours()}: ${fim.getMinutes()< 10 ? '0'+ fim.getMinutes():fim.getMinutes()}`}
              </FormText>
            </div>
          <div className={styles['modal-button-container']}>
            <Button onClick={confirmSessao} className={styles['modal-button']}>Atualizar</Button>
            <Confirmation message={message} isOpenConfirmation={isOpenConfirmation} 
               setIsOpenConfirmation={setIsOpenConfirmation} action={updateSessao}/>
          </div>
          </FormGroup>
        </Form>
      </ModalBody>  
      <ModalFooter>
        <Button color="danger" onClick={toogle}>Sair</Button>
      </ModalFooter>
    </Modal>
  );
}