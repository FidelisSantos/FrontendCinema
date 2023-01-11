import { useEffect } from 'react';
import { useFilmes } from './hooks/useFilmes';
import { HeaderAdm } from '../../components/navbar/HeaderAdm/HeaderAdm';
import { ThreeCircles } from 'react-loader-spinner';
import styles from './Filmes.module.css';
import { Navigate } from 'react-router-dom';
import { VscAdd, VscSettingsGear } from 'react-icons/vsc';
import { Table } from 'reactstrap';
import { ListFilmes } from '../../components/table/ListFilmes/ListFilmes';
import { CreateUpdateModal } from '../../components/modal/Filmes/Create-UpdateModal';

export function Filmes({...props}) {
  const { filmes, loading, error, setError, getFilmesList, 
          deleteFilme, createFilme, isOpen, setIsOpen } = useFilmes()

  useEffect(() => {
    if(!localStorage.getItem('token')) {
      setError('token');
    }

    props.setPage('filmes');

    const listFilme = async () => {
      await getFilmesList();
    }
    listFilme();
  },[]);

  function setIsAuth() {
    props.setIsAuth(false);
  }

  function toogleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      {loading && 
        <div className={styles['loader-container']}>
            <ThreeCircles 
              height="100"
              width="100"
              color="#000000"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""/>
        </div>}
      {!loading && error =='token' ||!localStorage.getItem('token') &&  
      <Navigate  to={'/'} state={props.setIsAuth(false)}/>}
      {!loading && error == 'Erro ao Listar a sala' 
        && <VscSettingsGear/>}
      {!loading && error != 'token' && error != 'Erro ao Listar a sala' &&
      <>  
      <HeaderAdm  isAuth={props.isAuth} setIsAuth={setIsAuth} error={props.error}
          setError={props.setError} errorMessage={props.errorMessage} 
          setErrorMessage={props.setErrorMessage} page={props.page}/>
      <div className={styles['table-filmes-container']}>
      <Table className={styles['table-filmes']}>
      <thead className={styles['thead-filmes']}>
        <tr>
          <th><button onClick={toogleModal}><VscAdd/></button></th>
          <CreateUpdateModal isOpen={isOpen} toogleModal={toogleModal}/>
          <th>Imagem</th>
          <th>Titulo</th>
          <th>Genero</th>
          <th>Descrição</th>
          <th>Tempo de Filme</th>
        </tr>
      </thead>
      <tbody>
        {filmes.map(filme => <tr key={filme.id}><ListFilmes filme={filme} deleteFilme={deleteFilme} /> </tr>)}
      </tbody>
    </Table>
    </div>
      </>}
  </>
  )
}