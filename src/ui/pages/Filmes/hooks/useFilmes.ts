import { useState } from "react"
import { FilmeType } from "../../../../types/filmeType";
import { filmesService } from '../service/filmesService';

export function useFilmes() {
  const [filmes, setFilmes] = useState<FilmeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const getFilmesList = async () => {
    setError('');
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await filmesService.getFilmes(token);
      console.log(response);
      if(response == 'Unauthorized') {
        setError('token');
        localStorage.removeItem('token');
        return;
      }
      else if(response == 'Error') {
        setError('Erro ao Listar a sala');
        return;
      }
      setFilmes(response)
    }
    else
      setError('token');
    setLoading(false);
  }

  const deleteFilme = async (id:number) => {
    setError('');
    setLoading(true);
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await filmesService.deleteFilme(token, id);
      console.log(response);
      if(response == 'Unauthorized') {
        localStorage.removeItem('token');
        setError('token');
        setLoading(false);
        return;
      }
      else if(!response) {
        setError('Erro ao deletar a sala');
        setLoading(false);
        return;
      }
      getFilmesList();
      return;
    }
    else
      setError('token');
    setLoading(false);
  }

  const createFilme = async (body: FilmeType) => {
    setError('');
    setLoading(true);
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await filmesService.createFilme(token, body);
      console.log(response);
      if(response == 'Unauthorized') {
        localStorage.removeItem('token');
        setError('token');
      }else if(response) {
        getFilmesList();
      }else if(!response){
        setError('Erro ao deletar')
      }
      else {
        setError(response);
      }
      setLoading(false);
    }
    else
      setError('token');
    setLoading(false);

  }


  return { filmes, loading, error, setError, getFilmesList, 
            deleteFilme, createFilme, isOpen, setIsOpen };
}