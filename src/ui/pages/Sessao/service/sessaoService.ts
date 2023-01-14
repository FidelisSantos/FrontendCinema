import { AxiosError } from 'axios';
import { api } from '../../../../api/api';
import { SessaoType } from '../../../../types/sessaoType';
import { PostSessaoType } from '../../../../types/postSessaoType';

export const sessaoService = {
  getSessao: async (token: string) => {
    const listSessoes = 
      await api.get<SessaoType[]>('sessao',  { headers: {Authorization: token}})
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
        console.log(listSessoes);
        return listSessoes;
  },

  deleteSessao: async (id: number ,token: string) =>{
    const isDeleted = await api.delete(`sessao/${id}`,{ headers: {Authorization: token}})
      .then(() => true)
      .catch((error) => {
        if (error.response && error.response.status === 401) 
              return 'Unauthorized';
        else if (error.response && error.response.status === 500) 
              return false;
        else return error.response.data.message;
      });

     return isDeleted;
  },

  createSessao: async (token: string, body: PostSessaoType) => {
    console.log(body);
    const Create = await api.post(`sessao`, body, { headers: {Authorization: token}})
      .then(() => true)
      .catch((error) => {
        console.log(error.response,'delete')
        if (error.response && error.response.status === 401) 
              return 'Unauthorized';
        else if (error.response && error.response.status === 500) 
              return false;
        else return error.response.data.message;
      });
      return Create;
  },

  updateSessao: async (token: string, body: PostSessaoType, id: number) => {
    console.log(body);
    const Create = await api.patch(`sessao/${id}`, body, { headers: {Authorization: token}})
      .then(() => true)
      .catch((error) => {
        console.log(error.response,'delete')
        if (error.response && error.response.status === 401) 
              return 'Unauthorized';
        else if (error.response && error.response.status === 500) 
              return false;
        else return error.response.data.message;
      });
      return Create;
  }
}