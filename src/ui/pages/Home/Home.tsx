import { useEffect} from "react";

import styles from './Home.module.css';
import { useHome } from "./hooks/useHome";
import { ThreeCircles } from "react-loader-spinner";
import { HeaderVisitor } from "../../components/navbar/HeaderVisitor/HeaderVisitor";
import { HeaderAdm } from '../../components/navbar/HeaderAdm/HeaderAdm';
import { CardFilmes } from "../../components/card/Home/CardFilmes";

export function Home ({...props}) {
  const { filmeSessoes, loading, getFilmeSessoes} = useHome();
  useEffect(() => {
    const getSessoes = async () =>{
      await getFilmeSessoes();
    }
    getSessoes();
    console.log(filmeSessoes);

    props.setPage('home');
  }, []);
  
  function setIsAuth() {
    props.setIsAuth();
  }

  function setErrorLogin() {
    props.setErrorLogin();
  }

  function loginAdm(email: string, password: string) {
    props.loginAdm(email, password);
  }

  return (
    <div className={styles['home-container']}>
      {!props.isAuth && <HeaderVisitor 
      isAuth={props.isAuth} setIsAuth={setIsAuth} loginAdm={loginAdm}
      errorLogin={props.errorLogin} setErrorLogin={setErrorLogin} />}
      {props.isAuth && <HeaderAdm 
      isAuth={props.isAuth} setIsAuth={setIsAuth} loginAdm={loginAdm}
      errorLogin={props.errorLogin} setErrorLogin={setErrorLogin} 
      page={props.page}/>}
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
      {!loading && <div className={styles['card-container']}>
        {filmeSessoes != null && filmeSessoes.map((filmeSessao) => 
        <div key={filmeSessao.filme.id}><CardFilmes {...filmeSessao} /></div>)}
      </div>}
    </div>
    )

}