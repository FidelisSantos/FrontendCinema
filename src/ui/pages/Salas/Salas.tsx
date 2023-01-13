import { Table } from "reactstrap";
import { VscAdd, VscSettingsGear } from "react-icons/vsc";
import { HeaderAdm } from '../../components/navbar/HeaderAdm/HeaderAdm';
import { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { useSala } from './hooks/useSala';
import { ListSalas } from "../../components/table/ListSalas/ListSalas";
import { ThreeCircles } from "react-loader-spinner";
import styles from './Sala.module.css';


export function Salas({...props}) {
  const {salas, loading, error, setError, getSalaList, createSala, deleteSala } = useSala()

  useEffect(() => {
    if(!localStorage.getItem('token')) {
      setError('token');
    }
    const getSalas = async ()=> {
      await getSalaList();
    }
    getSalas();

    props.setPage('salas');
  },[]);

  function setIsAuth() {
    props.setIsAuth(false);
  }

  function removeSala(id:number) {
    deleteSala(id);
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
      {!loading && error == 'token' ||!localStorage.getItem('token') &&  <Navigate  to={'/'} state={props.setIsAuth(false)}/>}
      {!loading && error == 'Erro ao Listar a sala' && <VscSettingsGear/>}
      {!loading && error != 'token' && error != 'Erro ao Listar a sala' &&
      <>  
      <HeaderAdm  isAuth={props.isAuth} setIsAuth={setIsAuth} error={props.error}
          setError={props.setError} errorMessage={props.errorMessage} 
          setErrorMessage={props.setErrorMessage} page={props.page}/>
      <div className={styles['table-salas-container']}>
      <Table className={styles['table-salas']}>
      <thead>
        <tr>
          <th><button onClick={createSala}><VscAdd/></button></th>
          <th>Salas</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {salas.map(sala => <tr key={sala.id}><ListSalas sala={sala} removeSala={removeSala}/> </tr>)}
      </tbody>
    </Table>
    </div>
    </>}
  </>
  )
}