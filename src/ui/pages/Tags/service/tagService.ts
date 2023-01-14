import { AxiosError } from 'axios';
import { api } from '../../../../api/api';
import { TagType } from '../../../../types/tagType';

export const tagService = {
  getTag: async (token: string) => {
    const tags = 
      await api.get<TagType[]>('tags', { headers:{ Authorization: token} })
            .then((response) => {
            console.log(response.config)
             return response.data
            })
            .catch((error:AxiosError) => {
            console.log(error.response, 'get')
            if (error.response && error.response.status === 401) 
              return 'Unauthorized';
            else 
              return 'Error';
            });
          console.log(tags);
          return tags;
  },

  deleteTag: async (id: number ,token: string) =>{
    const isDeleted = await api.delete(`tags/${id}`,{ headers: {Authorization: token}})
      .then(() => true)
      .catch((error) => {
        if (error.response && error.response.status === 401) 
              return 'Unauthorized';
        else if (error.response && error.response.status === 500)
              return 'Erro ao Deletar';
        else{
          return error.response.data.message;
        }
      });

     return isDeleted;
  },

  createTag: async (token: string, body: Partial<TagType>) => {
    console.log(body);
    const Create = await api.post(`tags`, body, { headers: {Authorization: token}})
      .then(() => true)
      .catch((error) => {
        console.log(error.response,'delete')
        if (error.response && error.response.status === 401) 
              return 'Unauthorized';
        else if (error.response && error.response.status === 500)
          return 'Erro ao criar';
        else {
          return error.response.data.message;
        }
      });
      return Create;
  },

  updateTag: async (token: string, body: Partial<TagType>, id: number) => {
    console.log(body);
    const Create = await api.patch(`tags/${id}`, body, { headers: {Authorization: token}})
      .then(() => true)
      .catch((error) => {
        console.log(error.response,'delete')
        if (error.response && error.response.status === 401) 
              return 'Unauthorized';
        else {
          return error.response.data.message;
        }
      });
      return Create;
  }
}