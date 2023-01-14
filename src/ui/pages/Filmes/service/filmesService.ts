import { AxiosError } from "axios";
import { api } from "../../../../api/api";
import { FilmeType } from "../../../../types/filmeType";
import { PostFilmeType } from "../../../../types/postFilmeType";
import { getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from '../../../../firebase/firebase-app';
import { ref } from 'firebase/storage';

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
      .catch((error) => {
        if (error.response && error.response.status === 401) 
              return 'Unauthorized';
        if (error.response && error.response.status === 500) 
              return false;
        else return error.response.data.message;
      });

     return isDeleted;
  },

  createFilme: async (token: string, body: PostFilmeType) => {
    console.log(body);
    const Create = await api.post(`filme`, body, { headers: {Authorization: token}})
      .then(() => true)
      .catch((error) => {
        console.log(error.response,'delete')
        if (error.response && error.response.status === 401) 
              return 'Unauthorized';
        if (error.response && error.response.status === 500) 
              return false;
        else return error.response.data.message;
      });
      return Create;
  },

  patchFilme: async (token: string, body: PostFilmeType, id: number) => {
    console.log(body);
    const UpdateFilme = 
          await api.patch(`filme/${id}`, body , { headers: {Authorization: token}})
                .then(()=> true)
                .catch((error) => {
                  console.log(error.response,'delete')
                  if (error.response && error.response.status === 401) 
                        return 'Unauthorized';
                  if (error.response && error.response.status === 500) 
                        return false;
                  else return error.response.data.message;
                });
              return UpdateFilme
  },

  createFirebaseUrl:  async (titulo: string, imagem: File)=>{
    const linkImageFolder = ref(storage, `FilmesImagens/${titulo}`);
    try{
      const upload = await uploadBytes(linkImageFolder, imagem);
      return  await getDownloadURL(upload.ref) as string;
    }catch {
      return "Erro gerar Url";
    }
  },

  deleteImageUrl: async (image: string) =>{
    const fileRef = ref(storage, image);
    console.log(fileRef)
    const del = await deleteObject(fileRef)
        .then(() => console.log('deu boa'))
        .catch(() => console.log('deu ruim'));
  }
}