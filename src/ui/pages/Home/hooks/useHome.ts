import { useEffect, useState } from 'react';

import { MovieSessionsType } from '../../../../types/movieSessionsType';
import { homeService } from '../service/homeService';

export function useHome() {
	const [movieSessions, setMovieSessions] = useState<MovieSessionsType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [search, setSearch] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);
	const movieSessionsSearch: MovieSessionsType[] = [];
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const getSessoes = async () => {
			await getFilmeSessoes();
		};
		getSessoes();
	}, []);

	const getFilmeSessoes = async () => {
		const getSessoes = await homeService.getFilmesSessoes();
		if (getSessoes != null) {
			if (getSessoes.length > 0) {
				setMovieSessions(getSessoes);
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
	};

	const searchFilmeSessao = (search: string) => {
		if (!search) {
			getFilmeSessoes();
			return;
		}
		const searchFilme = search;
		movieSessions.forEach((sessao) => {
			if (
				sessao.movie.title
					.toLocaleLowerCase()
					.includes(searchFilme.toLocaleLowerCase()) &&
				movieSessionsSearch.findIndex(
					(filme) => filme.movie.id == sessao.movie.id
				) < 0
			) {
				movieSessionsSearch.push(sessao);
			}
			sessao.movie.tags.forEach((tag) => {
				if (
					tag.tag
						.toLocaleLowerCase()
						.includes(searchFilme.toLocaleLowerCase()) &&
					movieSessionsSearch.findIndex(
						(filme) => filme.movie.id == sessao.movie.id
					) < 0
				) {
					movieSessionsSearch.push(sessao);
				}
			});
		});
		if (movieSessionsSearch.length === 0) {
			setError(true);
			setErrorMessage('Nenhum filme encontrado');
		} else setMovieSessions(movieSessionsSearch);

		setIsDisabled(true);
	};

	return {
		movieSessions,
		loading,
		getFilmeSessoes,
		search,
		setSearch,
		setMovieSessions,
		searchFilmeSessao,
		isDisabled,
		error,
		errorMessage,
		setError
	};
}
