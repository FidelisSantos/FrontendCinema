import { useEffect } from 'react';
import { useFilmes } from './hooks/useFilmes';
import { HeaderAdm } from '../../components/navbar/HeaderAdm/HeaderAdm';
import { ThreeCircles } from 'react-loader-spinner';
import styles from './Filmes.module.css';
import { Navigate } from 'react-router-dom';
import { VscAdd, VscSettingsGear } from 'react-icons/vsc';
import { CreateModal } from '../../components/modal/Filmes/CreateModal/CreateModal';
import { CardFilmes } from '../../components/card/Filmes/CardFilmes';

export function Filmes({...props}) {
  const { filmes, loading, error, setError, getFilmesList, 
          deleteFilme, createFilme,isOpen, setIsOpen, tags, updateFilme } = useFilmes()

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
    localStorage.removeItem('token');
    props.setIsAuth(false);
  }

  function toogleModal() {
    setIsOpen(!isOpen);
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
      {!loading && error == 'Erro ao Listar a sala' 
        && <VscSettingsGear/>}
      {!loading && error != 'token' && error != 'Erro ao Listar a sala' &&
      <>
      <div className={styles['filmes']}>
        <h1><strong>Filmes</strong></h1>
        <button onClick={toogleModal}><VscAdd/></button>
        <CreateModal isOpen={isOpen} setIsOpen={setIsOpen} tags={tags} createFilme={createFilme}/>
      </div>
      <div className={styles['filmes-container']}>
          {filmes.map((filme)=> <CardFilmes deleteFilme={deleteFilme} 
            filme={filme} updateFilme={updateFilme} tags={tags}/>)}
      </div>
      </>}
  </>
  )
}