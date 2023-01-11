import { useState } from "react"
import { SalaType } from "../../../../types/salaType"
import { salaService } from '../service/salasService';

export function useSala() {
  const [salas, setSalas] = useState<SalaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
 
  const getSalaList = async () => {
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await salaService.getSalaList(token);
      console.log(response);
      if(response == 'Unauthorized') {
        setError('token');
        return;
      }
      else if(response == 'Error') {
        setError('Erro ao Listar a sala');
        return;
      }
      setSalas(response)
    }
    else{
      setError('token');
      if(token)
        localStorage.removeItem('token');
    }
      
    setLoading(false);
  }

  const createSala = async () => {
    setLoading(true);
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await salaService.postSala(token);
      console.log(response);
      if(response == 'Unauthorized') {
        setError('token');
        setLoading(false);
        return;
      }
      else if(!response) {
        setError('Erro ao criar a sala');
        setLoading(false);
        return;
      }
      getSalaList();
      return;
    }
    else
      setError('token');
    setLoading(false);
  }

  const deleteSala = async (id:number) => {
    setLoading(true);
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await salaService.deleteSala(token, id);
      console.log(response);
      if(response == 'Unauthorized') {
        setError('token');
        setLoading(false);
        return;
      }
      else if(!response) {
        setError('Erro ao deletar a sala');
        setLoading(false);
        return;
      }
      getSalaList();
      return;
    }
    else
      setError('token');
    setLoading(false);
  }

  return { salas, loading, error, setError, getSalaList, createSala, deleteSala }
}