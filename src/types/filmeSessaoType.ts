import { FilmeType } from "./filmeType";
import { SessaoFilmeSessao } from "./sessaoFilmeSessaoType";

export type FilmeSessaoType = {
  filme: FilmeType,
  sessoes: SessaoFilmeSessao[];
}
