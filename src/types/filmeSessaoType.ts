import { FilmeType } from './filmeType';
import { SessaoFilmeSessao } from './sessaoFilmeSessaoType';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface FilmeSessaoType {
	filme: FilmeType;
	sessoes: SessaoFilmeSessao[];
}
