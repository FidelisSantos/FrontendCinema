import { AxiosError } from "axios";
import { api } from "../../../../api/api";
import { FilmeType } from "../../../../types/filmeType";
import { PostFilmeType } from "../../../../types/postFilmeType";

export const filmesService = {
  getFilmes: async (token: string) =>{
      const filmes = await api.get<FilmeType[]>('filme',{ headers:{ Authorization: token} })
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
      console.log(filmes);
      return filmes;
  },

  deleteFilme: async (token: string, id: number) => {
    const isDeleted = await api.delete(`filme/${id}`,{ headers: {Authorization: token}})
      .then(() => true)
      .catch((error:AxiosError) => {
        if (error.response && error.response.status === 401) 
              return 'Unauthorized';
        else{
          const errorMessage = error.response?.statusText;
          return { errorMessage };
        }
      });

     return isDeleted;
  },

  createFilme: async (token: string, body: PostFilmeType) => {
    console.log(body);
    const Create = await api.post(`filme`, body, { headers: {Authorization: token}})
      .then(() => true)
      .catch((error:AxiosError) => {
        console.log(error.response,'delete')
        if (error.response && error.response.status === 401) 
              return 'Unauthorized';
        else {
          const errorMessage = error.response?.statusText;
          return errorMessage ? errorMessage : false;
        }
      });
      return Create;
  },

  patchFilme: async (token: string, body: PostFilmeType, id: number) => {
    console.log(body);
    const UpdateFilme = 
          await api.patch(`filme/${id}`, body , { headers: {Authorization: token}})
                .then(()=> true)
                .catch((error: AxiosError) => {
                  console.log(error.response,'delete')
                  if (error.response && error.response.status === 401) 
                        return 'Unauthorized';
                  else {
                    const errorMessage = error.response?.statusText;
                    return errorMessage ? errorMessage : false;
                  }
                });
              return UpdateFilme
  }
}