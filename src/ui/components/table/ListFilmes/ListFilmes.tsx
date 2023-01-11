import { Button } from 'reactstrap';
import styles from './ListFilmes.module.css';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import { TagType } from '../../../../types/tagType';

export function ListFilmes({...props}) {

  function removeSala() {
    console.log('Removing');
    props.deleteFilme(props.filme.id)
  }

  return (
        <> 
            <th scope="row"></th>
            <td><a href={props.filme.linkImagem} target='_blank'><img src={props.filme.linkImagem} alt="" /></a></td>
            <td>{props.filme.titulo}</td>
            <td>{props.filme.tags.map((tag:TagType)=> <p key={tag.id}>{tag.tag}</p>)}</td>
            <td>{props.filme.descricao}</td>
            <td>{props.filme.tempoDeFilme} minutos</td>
            <Button color='none' className={styles['btn-remove']} onClick={removeSala}>
              <VscTrash color='red' className={styles['icon']}/>
            </Button>
            <Button color='none' className={styles['btn-edit']}>
              <VscEdit color='white' className={styles['icon']}/>
            </Button>
          </>
  );
}