import { ThreeCircles } from "react-loader-spinner";
import { HeaderAdm } from "../../components/navbar/HeaderAdm/HeaderAdm";
import { useTags } from './hooks/useTags';
import styles from './Tags.module.css';
import { Navigate } from "react-router-dom";
import { VscAdd, VscSettingsGear } from "react-icons/vsc";
import { Table } from "reactstrap";
import { ListTags } from '../../components/table/ListTags/ListTags';
import { useEffect } from "react";
import { CreateTag } from '../../components/modal/Tags/CreateTag/CreateTag';

export function Tags({...props}) {
  const {loading, tags, error, setError, getTagsList, 
        isOpen, setIsOpen, deleteTag, createTag, updateTag} = useTags();

  useEffect(() => {
    if(!localStorage.getItem('token')) {
      setError('token');
    }

    props.setPage('tags');

    const listTags = async () => {
      await getTagsList();
    }
    listTags();
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
            <CreateTag isOpen={isOpen} setIsOpen={setIsOpen} createTag={createTag}/>
            <th>Tags</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tags.map(tag => <tr key={tag.id}><ListTags tag={tag} 
            deleteTag={deleteTag} updateTag={updateTag}/> </tr>)}
        </tbody>
      </Table>
      </div>
        </>}
    </>
  )
}