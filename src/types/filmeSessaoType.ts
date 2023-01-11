import { FilmeType } from "./filmeType";
import { SessaoType } from "./sessaoType";

export type FilmeSessaoType = {
  filme: FilmeType,
  sessoes: SessaoType[];
}
