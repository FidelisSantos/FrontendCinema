import { FormEvent, useState } from 'react';

import { MovieType } from '../../../../types/movieType';
import { PostSessaoType } from '../../../../types/postSessionType';
import { RoomType } from '../../../../types/roomType';
import { SessionType } from '../../../../types/sessionType';
import { filmesService } from '../../Filmes/service/filmesService';
import { salaService } from '../../Salas/service/salasService';
import { sessaoService } from '../service/sessaoService';

export function useSessao() {
	const [loading, setLoading] = useState<boolean>(true);
	const [sessions, setSessions] = useState<SessionType[]>([]);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [rooms, setRooms] = useState<RoomType[]>([]);
	const [movies, setMovies] = useState<MovieType[]>([]);
	const sessionsSearch: SessionType[] = [];
	const [isDisabled, setIsDisabled] = useState(false);

	const getSessoesList = async () => {
		setErrorMessage('');
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await sessaoService.getSessao(token);
			if (response == 'Unauthorized') {
				setErrorMessage('token');
				localStorage.removeItem('token');
				return;
			} else if (response == 'Error') {
				setErrorMessage('Erro ao Listar as sessões');
				setError(true);
			} else setSessions(response);
			await getSalaList();
			await getFilmesList();
		} else {
			setErrorMessage('token');
		}

		setLoading(false);
	};

	const getSalaList = async () => {
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await salaService.getSalaList(token);
			if (response == 'Unauthorized') {
				setErrorMessage('token');
			} else if (response == 'Error') {
				setErrorMessage('Erro ao Listar as sessões');
				setError(true);
			} else setRooms(response);
		} else setErrorMessage('token');
	};

	const getFilmesList = async () => {
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await filmesService.getFilmes(token);
			if (response == 'Unauthorized') {
				setErrorMessage('token');
				localStorage.removeItem('token');
			} else if (response == 'Error') {
				setErrorMessage('Erro ao Listar as sessões');
				setError(true);
			} else setMovies(response);
		} else {
			setErrorMessage('token');
		}
	};

	const deleteSessao = async (id: number) => {
		setErrorMessage('');
		setLoading(true);
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await sessaoService.deleteSessao(id, token);
			if (response == 'Unauthorized') {
				localStorage.removeItem('token');
				setErrorMessage('token');
			} else if (!response) {
				setErrorMessage('Erro ao deletar sessão');
				setError(true);
			} else if (response === true) {
				getSessoesList();
			} else {
				const messageError = response
					? (response as string)
					: 'Erro ao deletar sessão';
				setErrorMessage(messageError);
				setError(true);
			}
		} else setErrorMessage('token');
		setLoading(false);
	};

	const createSessao = async (
		salaId: number,
		filmeId: number,
		init: string
	) => {
		const body: PostSessaoType = {
			roomId: salaId,
			movieId: filmeId,
			init
		};
		setErrorMessage('');
		setLoading(true);
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await sessaoService.createSessao(token, body);
			if (response == 'Unauthorized') {
				localStorage.removeItem('token');
				setErrorMessage('token');
			} else if (response === true) {
				getSessoesList();
			} else if (!response) {
				setErrorMessage('Erro ao criar sessão');
				setError(true);
			} else {
				const messageError = response
					? (response as string)
					: 'Erro ao criar sessão';
				setErrorMessage(messageError);
				setError(true);
			}
		} else setErrorMessage('token');
		setLoading(false);
	};

	const updateSessao = async (
		salaId: number,
		filmeId: number,
		init: string,
		id: number
	) => {
		const body: PostSessaoType = {
			roomId: salaId,
			movieId: filmeId,
			init
		};
		setErrorMessage('');
		setLoading(true);
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await sessaoService.updateSessao(token, body, id);
			if (response == 'Unauthorized') {
				localStorage.removeItem('token');
				setErrorMessage('token');
			} else if (response === true) {
				getSessoesList();
			} else if (!response) {
				setErrorMessage('Erro ao atualizar sessão');
				setError(true);
			} else {
				const messageError = response
					? (response as string)
					: 'Erro ao criar sessão';
				setErrorMessage(messageError);
				setError(true);
			}
		} else setErrorMessage('token');
		setLoading(false);
	};

	const searchSessao = async (e: FormEvent<HTMLInputElement>) => {
		const salaId = +e.currentTarget.value;
		setLoading(true);
		if (!salaId || salaId === 0) {
			getSessoesList();
			return;
		}
		sessions.forEach((session) => {
			console.log(session);
			if (session.movie.id === salaId) {
				sessionsSearch.push(session);
			}
		});
		if (sessionsSearch.length === 0) {
			setError(true);
			setErrorMessage('Nenhuma sessão encontrada nessa sala');
			e.currentTarget.value = '0';
		} else {
			setSessions(sessionsSearch);
			setIsDisabled(true);
		}
		setLoading(false);
	};

	return {
		loading,
		sessions,
		error,
		setError,
		getSessoesList,
		isOpen,
		setIsOpen,
		deleteSessao,
		rooms,
		movies,
		createSessao,
		updateSessao,
		errorMessage,
		setErrorMessage,
		searchSessao,
		isDisabled,
		setIsDisabled
	};
}
