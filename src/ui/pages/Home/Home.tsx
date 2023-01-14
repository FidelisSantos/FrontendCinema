import styles from './Home.module.css';
import { useHome } from "./hooks/useHome";
import { ThreeCircles } from "react-loader-spinner";
import { HeaderVisitor } from "../../components/navbar/HeaderVisitor/HeaderVisitor";
import { HeaderAdm } from '../../components/navbar/HeaderAdm/HeaderAdm';
import { CardFilmes } from "../../components/card/Home/CardFilmes";
import {  Button, Input } from "reactstrap";
import { AlertError } from '../../components/alert/Alert';

export function Home ({...props}) {
  const { filmeSessoes, loading, getFilmeSessoes, search, setSearch,
           searchFilmeSessao, isDisabled, error, errorMessage, setError } = useHome();
  props.setPage('home');

  function setIsAuth() {
    props.setIsAuth();
  }

  function setErrorLogin() {
    props.setErrorLogin();
  }

  function loginAdm(email: string, password: string) {
    props.loginAdm(email, password);
  }  

  if(error){
    const errorTimeOut = setInterval(() =>{
      setError(false);
      clearInterval(errorTimeOut);
    }, 5000);
  }

  return (
    <div className={styles['home-container']}>
      {!localStorage.getItem('token') && <HeaderVisitor 
      isAuth={props.isAuth} setIsAuth={setIsAuth} loginAdm={loginAdm}
      errorLogin={props.errorLogin} setErrorLogin={setErrorLogin} />}
      {localStorage.getItem('token') && <HeaderAdm 
      isAuth={props.isAuth} setIsAuth={setIsAuth} loginAdm={loginAdm}
      errorLogin={props.errorLogin} setErrorLogin={setErrorLogin} 
      page={props.page}/>}
       <div className={styles['alert-container']}>
          <AlertError error={error} setError={setError} errorMessage={errorMessage}/>
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
      {!loading && errorMessage == 'Erro ao listar sessões' && 
       <div className={styles['erro-listagem']}><img src={props.errorImg} alt="Error"/></div>}
      {!loading && errorMessage != 'Erro ao listar sessões' && 
      <>
      <div className={styles['search-container']}>
          <Input
          className={styles['search-input']}
          type="search"
          onChange={(e: any) =>setSearch(e.currentTarget.value)}
          disabled={isDisabled}
          value={search}
          placeholder="Pesquisa"/>
          {!isDisabled && <Button className={styles['btn-search']}
           onClick={()=> searchFilmeSessao(search)
           }>Pesquisar</Button>}
          {isDisabled && <Button className={styles['btn-reset']} 
          onClick={() => {
            getFilmeSessoes()
            setSearch('')}}>Limpar</Button>}
      </div>
        {errorMessage != 'Nenhum filme encontrado' && <div className={styles['card-container']}>
          {filmeSessoes!=null && filmeSessoes.map((filmeSessao) => 
            <div key={filmeSessao.filme.id}><CardFilmes {...filmeSessao} /></div>)}
        </div>}
        {errorMessage == 'Nenhum filme encontrado' &&
          <h1 className={styles['error-search']}>{errorMessage}</h1>}
      </>}
    </div>
    )
}