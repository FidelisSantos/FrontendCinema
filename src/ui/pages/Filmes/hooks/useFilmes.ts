import { useState } from "react"
import { FilmeType } from "../../../../types/filmeType";
import { filmesService } from '../service/filmesService';
import { TagType } from "../../../../types/tagType";
import { tagService } from "../../Tags/service/tagService";
import { PostFilmeType } from "../../../../types/postFilmeType";



export function useFilmes() {
  const [filmes, setFilmes] = useState<FilmeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<TagType[]>([])
  

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
      getTagsList()
    }

  const getTagsList = async () => {
    setError('');
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await tagService.getTag(token);
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
      setTags(response)
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

  const createFilme = 
    async (titulo: string, tempoDeFilme: number, genero: number[], 
              descricao: string, imagem: string|File) => {
      setError('');
      if(imagem instanceof File) {
        return
      }
      const body : PostFilmeType = {
        titulo: titulo,
        linkImagem: imagem,
        descricao: descricao,
        tempoDeFilme: tempoDeFilme,
        tags: genero
      }
      console.log(body);
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

  const updateFilme = 
    async (titulo: string, tempoDeFilme: number, genero: number[], 
              descricao: string, imagem: string|File, id: number) => {
      setError('');
      if(imagem instanceof File) {
        return
      }
      const body : PostFilmeType = {
        titulo: titulo,
        linkImagem: imagem,
        descricao: descricao,
        tempoDeFilme: tempoDeFilme,
        tags: genero
      }
      console.log(body);
      setLoading(true);
      const token = `Bearer ${localStorage.getItem('token')}`;
      if (token) { 
        const response = await filmesService.patchFilme(token, body, id);
        console.log(response);
        if(response == 'Unauthorized') {
          localStorage.removeItem('token');
          setError('token');
        } else if(response) {
          getFilmesList();
        } else if(!response) {
          setError('Erro ao deletar')
        } else {
          setError(response);
        }
        setLoading(false);
      }else
        setError('token');
      setLoading(false);
  }


  return { filmes, loading, error, setError, getFilmesList, 
            deleteFilme, createFilme, isOpen, setIsOpen, tags, updateFilme };
}