import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
import styles from './HeaderVisitor.module.css';
import logo from '../../../../img/logo.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginModal } from '../../modal/Home/LoginModal/LoginModal';

export function HeaderVisitor({...props}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggle(){
    setIsOpen(!isOpen);
  }

  function deslogar(){
    localStorage.removeItem('token');
    props.setIsAuth(false);
  }

  async function loginAdm(email: string, password: string) {
    await props.loginAdm(email, password);
    props.setPage('home');
  }
  
  if(!localStorage.getItem('token')) {
    deslogar();
  }

  return (
    <header>
      <div >
        <Navbar className={styles['navbar-container']}  light expand="md">
            <NavbarBrand className={styles['navbrand']}>
              <Link to='/' className={styles['navbrand-link']}> 
                CINEMA<img src={logo} alt="logo" />
              </Link>
            </NavbarBrand>
            <NavbarToggler />
            <Collapse navbar>
              <Nav className={styles['nav-container']} navbar>
                <NavItem >
                  {!props.isAuth && 
                  <NavLink className={styles['nav-header']} onClick={toggle}>Login</NavLink>
                  }
                  <LoginModal isOpen={isOpen} toggle={toggle} 
                    loginAdm={loginAdm} errorLogin={props.errorLogin} />
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
      </div>
    </header>
  )
}