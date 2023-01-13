import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Alert} from 'reactstrap';
import styles from './HeaderAdm.module.css';
import { Link, Navigate } from 'react-router-dom';
import logo from '../../../../img/logo.png';

export function HeaderAdm({...props}) {

  function deslogar() {
    localStorage.removeItem('token');
    props.setIsAuth(false);
  }

  if(props.error){
    const errorInterval = setInterval(() => {
      props.setError(false);
      clearInterval(errorInterval);
    }, 5000);
  }
  console.log(props.page);

  return (
    <>
      {!localStorage.getItem('token') && <Navigate to='/' />}
      <header>
        <div >
          <Navbar className={styles['navbar-container']}  light expand="md">
              <NavbarBrand className={styles['navbrand']}>
                <Link to='/' className={styles['navbrand-link']} > 
                  CINEMA<img src={logo} alt="logo" />
                </Link>
              </NavbarBrand>
              <NavbarToggler />
              <Collapse navbar>
              {props.error &&
              <Alert className= {styles['error-login']} color="danger">
                Login ou Senha Errados
              </Alert>}
                <Nav className={styles['nav-container']} navbar>
                  {props.page != 'home'&&
                  <NavItem>
                    <Link to='/'  className={styles['nav-header-link']}>
                      <NavLink className={styles['nav-header']} >Home</NavLink>
                    </Link>
                  </NavItem>}
                  {props.page != 'salas'&&
                  <NavItem>
                    <Link to='/salas'  className={styles['nav-header-link']} >
                      <NavLink className={styles['nav-header']} >Salas</NavLink>
                    </Link>
                  </NavItem>}
                  {props.page != 'tags'&& <NavItem>
                    <Link to='/tags'  className={styles['nav-header-link']}>
                    <NavLink className={styles['nav-header']} >Tags</NavLink>
                    </Link>
                  </NavItem>}
                 {props.page != 'filmes' && 
                 <NavItem>
                    <Link to='/filmes'  className={styles['nav-header-link']}>
                      <NavLink className={styles['nav-header']} >Filmes</NavLink>
                    </Link>
                  </NavItem>}
                  {props.page != 'sessoes' &&
                  <NavItem>
                    <Link to='/sessoes'  className={styles['nav-header-link']}>
                      <NavLink className={styles['nav-header']} >Sessões</NavLink>
                    </Link>
                  </NavItem>}
                  <NavItem >
                    <NavLink className={styles['nav-header']} onClick={deslogar}>Sair</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
        </div>
      </header>
    </>
    )
}