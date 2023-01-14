import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { FormEvent, useState } from 'react';
import styles from './UpdateForm.module.css';
import { TagType } from '../../../../../types/tagType';
import { useEffect } from 'react';
import { ListGenero } from './ListGenero/ListGenero';





export function UpdateForm({...props}) {
  const [hourMinute, setHourMinute] = useState('');
  const [tempoFilme, setTempoFilme] = useState(props.filme.tempoDeFilme);
  const [titulo, setTitulo] = useState(props.filme.titulo);
  const [descricao, setDescricao] = useState(props.filme.descricao);
  const [fileImg, setFileImg] = useState<File>();
  const [linkImg, setLinkImg] = useState(props.filme.linkImagem);
  const [genero, setGenero] = useState<number[]>([]);
  const [tempoFilmeAtual, setTempoFilmeAtual] = useState('');

useEffect(() =>{
  const formatteHour = () =>{
    const hour = Math.floor(tempoFilme/ 60);
    const min = tempoFilme % 60
    const hourMinutes = `${hour.toString()}:${min.toString()}`
    console.log(hourMinutes);

    return hourMinutes
  }
  
  const fomatterHourAtual = () => {
    const hour = formatteHour();
    setHourMinute(hour);
    const hourArray= hour.split(':');
     hourArray[0] = +hourArray[0] < 10 ? '0'+ hourArray[0] : hourArray[0];
     hourArray[1] = +hourArray[1] < 10 ? '0'+ hourArray[1] : hourArray[1];
     setTempoFilmeAtual( `${hourArray[0]}:${hourArray[1]}`);
  }
  fomatterHourAtual()
  const formatteGenero = () => {
    const tagsId: number[] =[]
    for (let index = 0 ; index < props.filme.tags.length ; index++){
      tagsId.push(props.filme.tags[index].id)
    }
    console.log(tagsId);
    return  tagsId
  }
  setGenero(formatteGenero)
  
}, [])
  

  function maskHours(e: FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength= 5
    let value = e.currentTarget.value;
    const verifyValue = value.split(':');
    verifyValue[1] = +verifyValue[1] >= 60 ? '59': verifyValue[1];
    value = verifyValue.toString();
    console.log(value, 'valor');
    value = value.replace(/\D/g,'');
    value = value.replace(/^(\d{2})(\d)/,"$1:$2");
    console.log(value, 'valor');
    setHourMinute(value);
    calcMinutes(value);
  }

  function calcMinutes(hour: string){
    const hourMinutes = hour.split(":");
    const minutes = ((+hourMinutes[0]*60) + (+hourMinutes[1]));
    console.log(minutes);
    setTempoFilme(minutes);
  }

  function updateFilme(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(fileImg) {
      updateUrl(e)
    }else {
      console.log(titulo, tempoFilme, genero, descricao, linkImg);
      props.updateFilme(titulo, tempoFilme, genero, descricao, linkImg, props.filme.id)
    }

    
  }

  function updateUrl(e: FormEvent<HTMLFormElement>){
    const formData = new FormData(e.currentTarget);
    const file = formData.get('imageFile') as File;
    props.updateUrl(titulo, tempoFilme, genero,descricao, file);
  }
  
  return (
    <Form className={styles['form-container']} onSubmit={updateFilme}>
    <FormGroup>
      <Label>Titulo</Label>
      <Input 
        type="text"  
        placeholder="Informe o titulo" 
        onChange={(e: any) => {
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
      defaultValue={hourMinute}
      value={hourMinute}
      required/>
    </FormGroup>
    <FormText color="muted">
        Tempo atual de filme {tempoFilmeAtual}
      </FormText>
    <FormGroup className={styles['form-tags']}>
      <Label>Selecione Gênero </Label> 
      <div className={styles['form-tags-options']}>
        {props.tags.map((tag:TagType)=> 
          <ListGenero genero={genero} setGenero={setGenero} tag={tag} />)}
      </div>
    </FormGroup>
    <FormGroup>
      <Label>Descrição</Label><br />
      <Input
        type="textarea" 
        placeholder="Informe a descrição" 
        onChange={(e: any) => {
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
        onChange={(e) => 
          setLinkImg(e.target.value)
         }
        value={linkImg}
        placeholder='Link da Imagem'
        required={fileImg ? false: true}
        />
      <FormText color="muted">
        Favor colocar arquivo da imagem ou link da imagem
      </FormText>
    </FormGroup>
    <Button type='submit'>Atualizar</Button>
  </Form>
  )
}