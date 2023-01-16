import { useEffect } from "react";
import { HeaderAdm } from "../../components/navbar/HeaderAdm/HeaderAdm";
import { ThreeCircles } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import { VscAdd } from "react-icons/vsc";
import styles from "./Sessao.module.css"
import { Table } from "reactstrap";
import { useSessao } from './hooks/useSessao';
import { ListSessoes } from '../../components/table/ListSessoes/ListSessoes';
import { CreateSessao } from "../../components/modal/Sessao/CreateSessao/CreateSessao";
import { AlertError } from "../../components/alert/Alert";

export function Sessao({...props}) {
  const {  loading, sessoes, error, setError, getSessoesList, isOpen, setIsOpen, deleteSessao,
          salas, filmes, createSessao, updateSessao, errorMessage, setErrorMessage} = useSessao();

    useEffect(() => {
      if(!localStorage.getItem('token')) {
        setErrorMessage('token');
      }
      props.setPage('sessoes');
  
      const listSessoes = async () => {
        await getSessoesList();
      }
      listSessoes();
    },[]);


  function setIsAuth() {
    localStorage.removeItem('token');
    props.setIsAuth(false);
  }

  if(error){
    const errorTimeOut = setInterval(() =>{
      setError(false);
      clearInterval(errorTimeOut);
    }, 5000);
  }

  return (
    <div>
      <div className={styles['header-container']}>
        <HeaderAdm isAuth={props.isAuth} setIsAuth={setIsAuth} error={props.error}
          setError={props.setError} errorMessage={props.errorMessage} 
          setErrorMessage={props.setErrorMessage} page={props.page}/>
          <div className={styles['alert-container']}>
            <AlertError error={error} setError={setError} errorMessage={errorMessage}/>
          </div>
      </div>
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
      {!loading && errorMessage =='token' ||!localStorage.getItem('token') &&  
        <Navigate  to={'/'} state={props.setIsAuth(false)}/>}
      {!loading && errorMessage == 'Erro ao Listar as sessões' && 
        <div className={styles['erro-listagem']}><img src={props.errorImg} alt="Error"/></div>}
      {!loading && errorMessage != 'Erro ao Listar as sessões' &&
        <>  
        <div className={styles['table-sessao-container']}>
        <Table className={styles['table-sessao']}>
        <thead className={styles['thead-sessao']}>
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
    </div>
  );
}