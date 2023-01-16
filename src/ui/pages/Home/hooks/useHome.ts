import {  useEffect, useState } from "react";
import { FilmeSessaoType } from "../../../../types/filmeSessaoType";
import { homeService } from "../service/homeService";

export function useHome() {
  const  [filmeSessoes , setSessoes] = useState<FilmeSessaoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState('');
  const [isDisabled,setIsDisabled ] = useState(false);
  const filmeSessoesSearch: FilmeSessaoType[] = [];
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getSessoes = async () =>{
      await getFilmeSessoes();
    }
    getSessoes();
  }, []);


  const getFilmeSessoes = async () => {
    const getSessoes = await homeService.getFilmesSessoes()
    if(getSessoes != null) {
      if(getSessoes.length > 0){
        setSessoes(getSessoes);
        setErrorMessage('');
        setError(false);
      } else {
        setErrorMessage('Não há filmes em cartaz');
        setError(true);
      }
    } else {
      setErrorMessage('Erro ao listar sessões');
      setError(true);
    }
    setIsDisabled(false);
    setLoading(false);
  }

  const searchFilmeSessao= (search: string) => {
    if(!search){
      getFilmeSessoes();
      return;
    }
    const searchFilme = search;
      filmeSessoes.forEach((sessao) => {
        if (sessao.filme.titulo.toLocaleLowerCase().includes(searchFilme.toLocaleLowerCase()) &&
            filmeSessoesSearch.findIndex((filme) => filme.filme.id ==  sessao.filme.id) < 0) {
              filmeSessoesSearch.push(sessao);
            }
              sessao.filme.tags.forEach((tag) =>{
                  if(tag.tag.toLocaleLowerCase().includes(searchFilme.toLocaleLowerCase()) &&
                  filmeSessoesSearch.findIndex((filme) => filme.filme.id ==  sessao.filme.id) < 0){
                    filmeSessoesSearch.push(sessao);
                  }
                })
      })
      if(!filmeSessoesSearch.length) {
        setError(true);
        setErrorMessage('Nenhum filme encontrado');
      }else setSessoes(filmeSessoesSearch);
        
      setIsDisabled(true);
  }



  return { filmeSessoes, loading, getFilmeSessoes, search, setSearch, 
          setSessoes, searchFilmeSessao, isDisabled, error, errorMessage, setError };
}