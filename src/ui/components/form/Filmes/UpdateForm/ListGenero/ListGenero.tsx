import { Input, Label } from "reactstrap";
import styles from './ListGenero.module.css';
import { useState } from 'react';

export function ListGenero({...props}) {
  const [ isCheck, setIsCheck] = useState(false);

  function setGenero(tagId: number) {
    const index = props.genero.indexOf(tagId)
    if (index >= 0) {
      props.genero.splice(index, 1);
      setIsCheck(false);
    }
    else {
      props.genero.push(tagId);
      setIsCheck(true);
    }
      
    props.setGenero(props.genero)
    console.log(props.genero)
  }

  return(
    <div className={styles['listgenero-container']}>
      <Input type="checkbox" value={props.tag.id} 
        onChange={() => setGenero(props.tag.id)} checked={props.genero.indexOf(props.tag.id) >= 0}/>{' '}
      <Label className={styles['listgenero-label']}>{props.tag.tag}</Label>
    </div>
  )
}