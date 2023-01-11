import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useState } from 'react';
import { ListGenero } from './ListGenero/ListGenero';
import styles from './Create-UpdateForm.module.css';



export function CreateUpdateForm({...props}) {
  const [genero, setGenero] = useState<string[]>([]);
  const listGenero = [
    'Ação',
    'Aventura',
    'Cinema de arte',
    'Chanchada',
    'Comédia',
    'Comedia de Ação',
   'Comédia de terror',
    'Comedia Dramatica',
    'Comedia Romantica', 
    'Dança',
    'Documentário',
    'Docuficção',
    'Drama',
    'Espionagem',
    'Faroeste',
    'Fantasia',
     'Fantasia científica',
     'Ficção científica',
    'Filmes com truques',
    'Filmes de guerra',
    'Mistério',
    'Musical',
     'Filme Policial',
     'Romance',
    'Terror',
    'Thriller',
  ]
  
  return (
    <Form className={styles['form-container']}>
    <FormGroup>
      <Label>Titulo</Label>
      <Input type="text"  placeholder="Informe o titulo" />
    </FormGroup>
    <FormGroup>
      <Label>Tempo de Filme</Label>
      <Input type="text" placeholder="Informe o tempo do filme em minutos" />
    </FormGroup>
    <FormGroup className={styles['form-genero']}>
      <Label>Genero</Label>
      <br />
      <div className={styles['form-genero-options']}>
        {listGenero.map((genero) => <ListGenero genero={genero} />)}
      </div>
    </FormGroup>
    <FormGroup>
      <Label for="exampleText">Descrição</Label><br />
      <Input type="textarea" name="text" id="exampleText" />
    </FormGroup>
    <FormGroup>
      <Label for="exampleFile">Imagem do filme</Label>
      <Input type="file" name="file" id="exampleFile" />
      <FormText color="muted">
        This is some placeholder block-level help text for the above input.
        It's a bit lighter and easily wraps to a new line.
      </FormText>
    </FormGroup>
    <Button>Submit</Button>
  </Form>
  )
}