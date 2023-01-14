import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { FormEvent, useState } from 'react';
import { ListGenero } from './ListGenero/ListGenero';
import styles from './CreateForm.module.css';
import { TagType } from '../../../../../types/tagType';





export function CreateForm({...props}) {
  const [hourMinute, setHourMinute] = useState('');
  const [tempoFilme, setTempoFilme] = useState(0);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fileImg, setFileImg] = useState<File>();
  const [linkImg, setLinkImg] = useState('');
  const [genero, setGenero] = useState<number[]>([]);


  

  function maskHours(e: FormEvent<HTMLInputElement>){
    e.currentTarget.maxLength= 5
    let value = e.currentTarget.value;
    const verifyValue = value.split(':');
    verifyValue[1] = +verifyValue[1] >= 60 ? '59': verifyValue[1];
    value = verifyValue.toString();
    value = value.replace(/\D/g,'');
    value = value.replace(/^(\d{2})(\d)/,"$1:$2");
    setHourMinute(value);
    calcMinutes(value);
  }

  function calcMinutes(hour: string){
    const hourMinutes = hour.split(":");
    const minutes = ((+hourMinutes[0]*60) + (+hourMinutes[1]));
    console.log(minutes);
    setTempoFilme(minutes);
  }

  async function createFilme(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let imagem
    console.log(fileImg as File);
    if(fileImg || !linkImg ) {
      createUrl(e);
    } else{
      imagem = linkImg
      props.createFilme(titulo, tempoFilme, genero, descricao, imagem)
    } 
  }

  async function createUrl(e: FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const file = formData.get('imageFile') as File;
    console.log(file);
    props.createUrl(file, titulo, tempoFilme, genero, descricao);
  }
  
  return (
    <Form className={styles['form-container']} method='POSt' onSubmit={createFilme}>
    <FormGroup>
      <Label>Titulo</Label>
      <Input 
        type="text"  
        placeholder="Informe o titulo" 
        onChange={(e) => {
          setTitulo(e.target.value)
          console.log(titulo, e.target.value)}}
        value={titulo}
        required
        />
    </FormGroup>
    <FormGroup>
      <Label>Tempo de Filme</Label>
      <Input type="time" 
      inputMode="numeric"
      placeholder="Informe o tempo do filme em minutos(ex 01:50)"
      id='tempoFilme'
      onChange={maskHours}
      value={hourMinute}
      required/>
    </FormGroup>
    <FormGroup className={styles['form-tags']}>
      <Label>Selecione as Tags </Label> 
      <div className={styles['form-tags-options']}>
        {props.tags.map((tag:TagType) => <ListGenero tag={tag}
           key={tag.id} genero={genero} setGenero={setGenero}/>)}
      </div>
    </FormGroup>
    <FormGroup>
      <Label>Descrição</Label><br />
      <Input
        type="textarea" 
        placeholder="Informe a descrição" 
        onChange={(e) => {
          setDescricao(e.target.value)
          console.log(descricao, e.target.value)}}
        value={descricao}
        required/>
    </FormGroup>
    <FormGroup>
      <Label for="exampleFile">Imagem do filme</Label>
      <Input 
        type="file"
        disabled={linkImg ? true: false} 
        onChange={(e: any) =>{
          setFileImg(e.target.value);
        }}
        required={linkImg ? false: true}
        name='imageFile'
        />
      <Input 
        type="url" 
        disabled={fileImg ? true: false}
        onChange={(e: any) => {
          setLinkImg(e.target.value)
          console.log(linkImg, e.target.value)}}
        value={linkImg}
        placeholder='Link da Imagem'
        required={fileImg ? false: true}
        />
      <FormText color="muted">
        Favor colocar arquivo da imagem ou link da imagem
      </FormText>
    </FormGroup>
    <Button type="submit">Cadastrar</Button>
  </Form>
  )
}