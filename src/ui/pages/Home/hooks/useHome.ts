import { useState } from "react";
import { FilmeSessaoType } from "../../../../types/filmeSessaoType";
import { homeService } from "../service/homeService";

export function useHome() {
  const  [filmeSessoes , setSessoes] = useState<FilmeSessaoType[]| null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getFilmeSessoes = async () => {
    setSessoes(await homeService.getFilmesSessoes());
    setLoading(false);
  }

  return { filmeSessoes, loading, getFilmeSessoes };
}