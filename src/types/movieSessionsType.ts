import { MovieType } from './movieType';
import { SessionsMovieType } from './sessionsMovieType';

// eslint-disable-next-line @typescript-eslint/naming-convention
export type MovieSessionsType = {
	movie: MovieType;
	sessions: SessionsMovieType[];
};
