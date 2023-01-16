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
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [salas, setSalas] = useState<SalaType[]>([]);
  const [filmes, setFilmes] = useState<FilmeType[]>([]);


  const getSessoesList = async () => {
    setErrorMessage('');
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await sessaoService.getSessao(token);
      if(response == 'Unauthorized') {
        setErrorMessage('token');
        localStorage.removeItem('token');
        return;
      }
      else if(response == 'Error') {
        setErrorMessage('Erro ao Listar as sessões');
        setError(true);
      } else setSessoes(response);
      await getSalaList();
      await getFilmesList();
    }
    else
      setErrorMessage('token');

    setLoading(false);
  }

  const getSalaList = async () => {
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await salaService.getSalaList(token);
      if(response == 'Unauthorized') {
        setErrorMessage('token');
        return;
      }
      else if(response == 'Error') {
        setErrorMessage('Erro ao Listar as sessões');
        setError(true);
        return;
      } else setSalas(response)
    }
    else setErrorMessage('token');
  }

  const getFilmesList = async () => {
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await filmesService.getFilmes(token);
      if(response == 'Unauthorized') {
        setErrorMessage('token');
        localStorage.removeItem('token');
      }
      else if(response == 'Error') {
        setErrorMessage('Erro ao Listar as sessões');
        setError(true);
      } else setFilmes(response)
    }
    else
      setErrorMessage('token');
    }


  const deleteSessao = async (id:number) => {
    setErrorMessage('');
    setLoading(true);
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await sessaoService.deleteSessao(id, token);
      if(response == 'Unauthorized') {
        localStorage.removeItem('token');
        setErrorMessage('token');
      } else if(!response) {
        setErrorMessage('Erro ao deletar sessão');
        setError(true);
      } else if(response === true ) {
        getSessoesList();
      } else {
        const messageError = response ? response as string :  'Erro ao deletar sessão';
        setErrorMessage(messageError);
        setError(true);
      }
    } else  setErrorMessage('token');
    setLoading(false);
  }

  const createSessao = async (salaId: number, filmeId: number,init: string) => {
    const body:PostSessaoType = {
      salaId: salaId,
      filmeId: filmeId,
      init: init
    }
    setErrorMessage('');
    setLoading(true);
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await sessaoService.createSessao(token, body);
      if(response == 'Unauthorized') {
        localStorage.removeItem('token');
        setErrorMessage('token');
      }else if(response === true) {
        getSessoesList();
      }else if(!response){
        setErrorMessage('Erro ao criar sessão');
        setError(true);
      } else {
        const messageError = response ? response as string :  'Erro ao criar sessão';
        setErrorMessage(messageError);
        setError(true);
      }
    } else setErrorMessage('token');
    setLoading(false);
  }

  const updateSessao = async (salaId: number, filmeId: number,init: string, id: number) => {
    const body:PostSessaoType = {
      salaId: salaId,
      filmeId: filmeId,
      init: init
    }
    setErrorMessage('');
    setLoading(true);
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await sessaoService.updateSessao(token, body, id);
      if(response == 'Unauthorized') {
        localStorage.removeItem('token');
        setErrorMessage('token');
      }else if(response === true) {
        getSessoesList();
      }else if(!response){
        setErrorMessage('Erro ao atualizar sessão');
        setError(true);
      } else {
        const messageError = response ? response as string :  'Erro ao criar sessão';
        setErrorMessage(messageError);
        setError(true);
      }
    } else setErrorMessage('token');
    setLoading(false);
  }


  return { loading, sessoes, error, setError, getSessoesList, isOpen, setIsOpen, deleteSessao,
           salas, filmes, createSessao, updateSessao, errorMessage, setErrorMessage }
}