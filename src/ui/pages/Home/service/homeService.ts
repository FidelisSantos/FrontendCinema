import { api } from "../../../../api/api"
import { FilmeSessaoType } from "../../../../types/filmeSessaoType"

export const homeService = {
  getFilmesSessoes: async () => {
    const data = await api.get<FilmeSessaoType[]>('filmesessao')
    .then((response) => response.data)
    .catch(() => {
      return null;
    })
    return data;
  },

  searchFilmesSessoes: async (search: string) => {
    const data = await api.get<FilmeSessaoType[]>('filmesessao',{params: {search: search}})
    .then((response) => response.data)
    .catch(() => {
      return [];
    })
    return data;
  }


}