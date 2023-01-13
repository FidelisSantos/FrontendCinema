import { useState } from "react";
import { TagType } from "../../../../types/tagType";
import { tagService } from "../service/tagService";

export function useTags() {
  const [loading, setLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<TagType[]>([]);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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

  const deleteTag = async (id:number) => {
    setError('');
    setLoading(true);
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await tagService.deleteTag(id, token);
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
      getTagsList();
      return;
    }
    else
      setError('token');
    setLoading(false);
  }

  const createTag = async (newTag: string) => {
    const body:Partial<TagType> = {
      tag:newTag
    }
    setError('');
    setLoading(true);
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await tagService.createTag(token, body);
      console.log(response);
      if(response == 'Unauthorized') {
        localStorage.removeItem('token');
        setError('token');
      }else if(response) {
        getTagsList();
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

  const updateTag = async (newTag: string, id: number) => {
    const body:Partial<TagType> = {
      tag:newTag
    }
    setError('');
    setLoading(true);
    const token = `Bearer ${localStorage.getItem('token')}`;
    if (token) { 
      const response = await tagService.updateTag(token, body, id);
      console.log(response);
      if(response == 'Unauthorized') {
        localStorage.removeItem('token');
        setError('token');
      }else if(response) {
        getTagsList();
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

  return {loading, tags, error, setError, getTagsList, 
          isOpen, setIsOpen, deleteTag, createTag, updateTag}
}