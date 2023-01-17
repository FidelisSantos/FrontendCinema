import { useState } from 'react';

import { SalaType } from '../../../../types/salaType';
import { salaService } from '../service/salasService';

export function useSala() {
	const [salas, setSalas] = useState<SalaType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const getSalaList = async () => {
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await salaService.getSalaList(token);
			if (response == 'Unauthorized') {
				setErrorMessage('token');
			} else if (response == 'Error') {
				setErrorMessage('Erro ao Listar a sala');
				setError(true);
			} else setSalas(response);
		} else {
			setErrorMessage('token');
			if (token) {
				localStorage.removeItem('token');
			}
		}

		setLoading(false);
	};

	const createSala = async () => {
		setLoading(true);
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await salaService.postSala(token);
			if (response == 'Unauthorized') {
				setErrorMessage('token');
				setLoading(false);
				return;
			} else if (!response) {
				setErrorMessage('Erro ao criar a sala');
				setError(true);
				setLoading(false);
				return;
			} else if (response) {
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
				setLoading(false);
				return;
			} else if (!response) {
				setErrorMessage('Erro ao deletar a sala');
				setLoading(false);
				return;
			} else if (response === true) {
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

	return {
		salas,
		loading,
		error,
		setError,
		getSalaList,
		createSala,
		deleteSala,
		errorMessage,
		setErrorMessage
	};
}
