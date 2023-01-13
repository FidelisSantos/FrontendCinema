import { useState } from "react";
import { SessaoType } from "../../../../types/sessaoType";
import { sessaoService } from '../service/sessaoService';
import { SalaType } from "../../../../types/salaType";
import { FilmeType } from "../../../../types/filmeType";
import { salaService } from "../../Salas/service/salasService";
import { filmesService } from "../../Filmes/service/filmesService";
import { PostSessaoType } from "../../../../types/postSessaoType";

export function useSessao() {
  const [loading, setLoading] = useState<boolean>(true);
  const [sessoes, setSessoes] = useState<SessaoType[]>([]);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [salas, setSalas] = useState<SalaType[]>([]);
  const [filmes, setFilmes] = useState<FilmeType[]>([]);


  const getSessoesList = async () => {
    setError('');
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await sessaoService.getSessao(token);
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
      setSessoes(response);
      await getSalaList();
      await getFilmesList();
    }
    else
      setError('token');

    setLoading(false);
  }

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
    }


  const deleteSessao = async (id:number) => {
    setError('');
    setLoading(true);
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await sessaoService.deleteSessao(id, token);
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
      getSessoesList();
      return;
    }
    else
      setError('token');
    setLoading(false);
  }

  const createSessao = async (salaId: number, filmeId: number,init: string) => {
    const body:PostSessaoType = {
      salaId: salaId,
      filmeId: filmeId,
      init: init
    }
    setError('');
    setLoading(true);
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await sessaoService.createSessao(token, body);
      console.log(response);
      if(response == 'Unauthorized') {
        localStorage.removeItem('token');
        setError('token');
      }else if(response) {
        getSessoesList();
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

  const updateSessao = async (salaId: number, filmeId: number,init: string, id: number) => {
    const body:PostSessaoType = {
      salaId: salaId,
      filmeId: filmeId,
      init: init
    }
    setError('');
    setLoading(true);
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await sessaoService.updateSessao(token, body, id);
      console.log(response);
      if(response == 'Unauthorized') {
        localStorage.removeItem('token');
        setError('token');
      }else if(response) {
        getSessoesList();
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


  return { loading, sessoes, error, setError, getSessoesList, isOpen, 
          setIsOpen, deleteSessao, salas, filmes, createSessao, updateSessao }
}