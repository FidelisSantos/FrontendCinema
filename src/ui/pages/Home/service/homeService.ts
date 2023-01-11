import { api } from "../../../../api/api"
import { FilmeSessaoType } from "../../../../types/filmeSessaoType"

export const homeService = {
  getFilmesSessoes: async () => {
    const data = await api.get<FilmeSessaoType[]>('filmesessao')
    .then((response) => response.data)
    .catch((error:Error) => {
      console.error(error.message)
      return [];
    })
    console.log(data, 'teste');
    return data;
  },

}