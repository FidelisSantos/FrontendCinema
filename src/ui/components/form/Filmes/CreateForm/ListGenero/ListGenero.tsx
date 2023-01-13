import { Input, Label } from "reactstrap";
import styles from './ListGenero.module.css';

export function ListGenero({...props}) {

  function setGenero(tagId: number) {
    const index = props.genero.indexOf(tagId)
    if (index >= 0) 
      props.genero.splice(index, 1);
    else 
      props.genero.push(tagId);
    props.setGenero(props.genero)
    console.log(props.genero)
  }

  return(
    <div className={styles['listgenero-container']}>
      <Input type="checkbox" value={props.tag.id} onChange={() => setGenero(props.tag.id)}/>{' '}
      <Label className={styles['listgenero-label']}>{props.tag.tag}</Label>
    </div>
  )
}