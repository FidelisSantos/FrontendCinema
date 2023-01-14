import { useState } from "react"
import { FilmeType } from "../../../../types/filmeType";
import { filmesService } from '../service/filmesService';
import { TagType } from "../../../../types/tagType";
import { tagService } from "../../Tags/service/tagService";
import { PostFilmeType } from "../../../../types/postFilmeType";
import uuidv4 from 'uuidv4';

export function useFilmes() {
  const [filmes, setFilmes] = useState<FilmeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<TagType[]>([]);
  const imagesTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/png'];
  

  const getFilmesList = async () => {
    setErrorMessage('');
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
        const response = await filmesService.getFilmes(token);
        console.log(response);
        if(response == 'Unauthorized') {
          setErrorMessage('token');
          localStorage.removeItem('token');
          return;
        } else if(response == 'Error') {
          setErrorMessage('Erro ao Listar os filmes');
          setError(true);
        } else{
          setFilmes(response);
          getTagsList();
        } 
      } else setErrorMessage('token'); 
    }

  const getTagsList = async () => {
    setErrorMessage('');
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await tagService.getTag(token);
      console.log(response);
      if(response == 'Unauthorized') {
        setErrorMessage('token');
        localStorage.removeItem('token');
        return;
      }
      else if(response == 'Error') {
        setErrorMessage('Erro ao Listar os filmes');
        setError(true);
        return;
      }
      setTags(response)
    }
    else
      setErrorMessage('token');
    setLoading(false);
  }

  const deleteFilme = async (id:number, image: string) => {
    setErrorMessage('');
    setLoading(true);
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await filmesService.deleteFilme(token, id);
      console.log(response);
      if(response == 'Unauthorized') {
        localStorage.removeItem('token');
        setErrorMessage('token');
      }
      else if(!response) {
        setErrorMessage('Erro ao deletear o filmes');
        setError(true);
      } else if(response === true) {
        getFilmesList();
        await filmesService.deleteImageUrl(image);
      } else {
        const messageError = response ? response as string :  'Erro ao deletar o filme';
        setErrorMessage(messageError);
        setError(true);
      }
      setLoading(false);
    }
    else
      setErrorMessage('token');
    setLoading(false);
  }

  const createFilme = 
    async (titulo: string, tempoDeFilme: number, genero: number[], 
              descricao: string, imagem: string) => {
      setErrorMessage('');
      setError(false);
      setLoading(true);
      const body : PostFilmeType = {
        titulo: titulo,
        linkImagem: imagem,
        descricao: descricao,
        tempoDeFilme: tempoDeFilme,
        tags: genero,
      }
      console.log(body, 'testando');
      const token = `Bearer ${localStorage.getItem('token')}`;
      if (token) { 
        const response = await filmesService.createFilme(token, body);
        console.log(response);
        if(response == 'Unauthorized') {
          localStorage.removeItem('token');
          setErrorMessage('token');
        }else if(response === true) {
          getFilmesList();
          return;
        }else if(!response){
          setErrorMessage('Erro ao criar');
          setError(true);
        }
        else {
          const messageError = response ? response as string :  'Erro ao criar o filme';
          setErrorMessage(messageError);
          setError(true);
        }
      }
      else setErrorMessage('token');
      setLoading(false);
  }

  const updateFilme = 
    async (titulo: string, tempoDeFilme: number, genero: number[], 
              descricao: string, imagem: string, id: number, oldImage: string) => {
      setErrorMessage('');
      setLoading(true);
      await filmesService.deleteImageUrl(oldImage);
      const body : PostFilmeType = {
        titulo: titulo,
        linkImagem: imagem,
        descricao: descricao,
        tempoDeFilme: tempoDeFilme,
        tags: genero
      }
      console.log(body);
      const token = `Bearer ${localStorage.getItem('token')}`;
      if (token) { 
        const response = await filmesService.patchFilme(token, body, id);
        console.log(response);
        if(response == 'Unauthorized') {
          localStorage.removeItem('token');
          setErrorMessage('token');
        } else if(response === true) {
          getFilmesList();
          return;
        } else if(!response) {
          setErrorMessage('Erro ao deletar');
          setError(true);
        } else {
          const messageError = response ? response as string :  'Erro ao deletar o filme';
          setErrorMessage(messageError);
          setError(true);
        }
        setLoading(false);
      }else
        setErrorMessage('token');
      setLoading(false);
  }

  const createUrl = async (imagem: File, titulo: string, tempoDeFilme: number, genero: number[],descricao: string) => {
        setError(false);
        setLoading(true);
      if(imagem && imagem.size > 0 && imagesTypes.includes(imagem.type)) {
        const firebaseId= uuidv4();
        const linkImagem = await filmesService.createFirebaseUrl(firebaseId, imagem);
        console.log(linkImagem);
        if(linkImagem === 'Erro gerar Url') {
          setErrorMessage(linkImagem);
          setError(true);
          setLoading(false);
          return ;
        } 
        await createFilme(titulo, tempoDeFilme, genero, descricao,linkImagem)
        return 
      }else {
        setErrorMessage('Arquivo inválido');
        setError(true);
        setLoading(false);
        return;
      }
  }

  const updateUrl = async (id: number, titulo: string, tempoDeFilme: number, 
                          genero: number[],descricao: string, oldImage: string, newImage:File) => {
                            console.log('entrei 3');
    setError(false);
    setLoading(true);
    console.log(newImage, genero)
  if(newImage && newImage.size > 0 && imagesTypes.includes(newImage.type)) {
    const firebaseId= uuidv4();
    const linkImagem = await filmesService.createFirebaseUrl(firebaseId, newImage);
    console.log(linkImagem);
    if(linkImagem === 'Erro gerar Url') {
      setErrorMessage(linkImagem);
      setError(true);
      setLoading(false);
      return ;
    } 
    await updateFilme(titulo,tempoDeFilme,genero,descricao,linkImagem, id, oldImage)
    return 
  }else {
    setErrorMessage('Arquivo inválido');
    setError(true);
    setLoading(false);
    return;
  }
}
  


  return { filmes, loading, error, setError, getFilmesList, deleteFilme, createFilme,isOpen, 
          setIsOpen, tags, updateFilme, errorMessage, setErrorMessage, createUrl, updateUrl };
}