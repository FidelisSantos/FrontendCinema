import { useEffect } from "react";
import { HeaderAdm } from "../../components/navbar/HeaderAdm/HeaderAdm";
import { ThreeCircles } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import { VscAdd, VscSettingsGear } from "react-icons/vsc";
import styles from "./Sessao.module.css"
import { Table } from "reactstrap";
import { useSessao } from './hooks/useSessao';
import { ListSessoes } from '../../components/table/ListSessoes/ListSessoes';
import { CreateSessao } from "../../components/modal/Sessao/CreateSessao/CreateSessao";

export function Sessao({...props}) {
  const { loading, sessoes, error, setError, getSessoesList, isOpen, 
          setIsOpen, deleteSessao, salas, filmes, createSessao, updateSessao} = useSessao();
  
    useEffect(() => {
      if(!localStorage.getItem('token')) {
        setError('token');
      }
      props.setPage('sessoes');
  
      const listSessoes = async () => {
        await getSessoesList();
      }
      listSessoes();
      console.log(sessoes)
    },[]);


  function setIsAuth() {
    localStorage.removeItem('token');
    props.setIsAuth(false);
  }

  return (
    <>
      <HeaderAdm  isAuth={props.isAuth} setIsAuth={setIsAuth} error={props.error}
          setError={props.setError} errorMessage={props.errorMessage} 
          setErrorMessage={props.setErrorMessage} page={props.page}/>
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
      {!loading && error == 'Erro ao Listar as tags' && <VscSettingsGear/>}
      {!loading && !error &&
        <>  
        <div className={styles['table-tags-container']}>
        <Table className={styles['table-tags']}>
        <thead className={styles['thead-tags']}>
          <tr>
            <th><button onClick={()=> setIsOpen(true)}><VscAdd/></button></th>
            <CreateSessao setIsOpen={setIsOpen} isOpen={isOpen} 
              filmes={filmes} salas={salas} createSessao={createSessao}/>
            <th>Sessoes</th>
            <th>Filme</th>
            <th>Inicio</th>
            <th>Fim</th>
            <th>Sala</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {sessoes.map(sessao => <tr key={sessao.id}>
          <ListSessoes sessao={sessao} deleteSessao={deleteSessao} 
            updateSessao={updateSessao} filmes={filmes} salas={salas}/>
          </tr>)}
        </tbody>
      </Table>
      </div>
        </>}
    </>
  );
}