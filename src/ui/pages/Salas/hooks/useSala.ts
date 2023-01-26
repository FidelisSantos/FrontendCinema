import { useState } from 'react';

import { RoomType } from '../../../../types/roomType';
import { salaService } from '../service/salasService';

export function useSala() {
	const [salas, setSalas] = useState<RoomType[]>([]);
	const [salaName, setSalaName] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [isOpenUpdate, setIsOpenUpdate] = useState(false);

	const getSalaList = async () => {
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await salaService.getSalaList(token);
			if (response == 'Unauthorized') {
				setErrorMessage('token');
				localStorage.removeItem('token');
			} else if (response == 'Error') {
				setErrorMessage('Erro ao Listar a sala');
				setError(true);
			} else setSalas(response);
		} else setErrorMessage('token');

		setLoading(false);
	};

	const createSala = async () => {
		setLoading(true);
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await salaService.postSala(salaName, token);
			if (response == 'Unauthorized') {
				setErrorMessage('token');
				localStorage.removeItem('token');
			} else if (!response) {
				setErrorMessage('Erro ao criar a sala');
				setError(true);
				setLoading(false);
				return;
			} else if (response === true) {
				setIsOpenCreate(false);
				getSalaList();
				return;
			} else {
				setErrorMessage(response);
				setLoading(false);
				setError(true);
			}
		} else {
			setErrorMessage('token');
		}
		setLoading(false);
	};

	const updateSala = async (id: number, name: string) => {
		setLoading(true);
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await salaService.updateSala(id, name, token);
			if (response == 'Unauthorized') {
				setErrorMessage('token');
				localStorage.removeItem('token');
			} else if (!response) {
				setErrorMessage('Erro ao criar a sala');
				setError(true);
				setLoading(false);
				return;
			} else if (response === true) {
				setIsOpenUpdate(false);
				getSalaList();
				return;
			} else {
				setErrorMessage(response);
				setLoading(false);
				setError(true);
			}
		} else {
			setErrorMessage('token');
		}
		setLoading(false);
	};

	const deleteSala = async (id: number) => {
		setLoading(true);
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await salaService.deleteSala(token, id);
			if (response == 'Unauthorized') {
				setErrorMessage('token');
				localStorage.removeItem('token');
			} else if (!response) {
				setErrorMessage('Erro ao deletar a sala');
				setError(true);
			} else if (response === true) {
				getSalaList();
				return;
			} else {
				setErrorMessage(response);
				setLoading(false);
				setError(true);
			}
		} else setErrorMessage('token');

		setLoading(false);
	};

	return {
		salas,
		loading,
		error,
		salaName,
		setSalaName,
		setError,
		isOpenCreate,
		setIsOpenCreate,
		isOpenUpdate,
		setIsOpenUpdate,
		getSalaList,
		createSala,
		deleteSala,
		errorMessage,
		setErrorMessage,
		updateSala
	};
}
