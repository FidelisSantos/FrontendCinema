import { AxiosError } from 'axios';

import { api } from '../../../../api/api';
import { SalaType } from '../../../../types/salaType';

export const salaService = {
	getSalaList: async (token: string) => {
		const salas = await api
			.get<SalaType[]>('sala', { headers: { Authorization: token } })
			.then((response) => {
				return response.data;
			})
			.catch((error: AxiosError) => {
				if (error.response != null && error.response.status === 401) {
					return 'Unauthorized';
				} else {
					return 'Error';
				}
			});
		return salas;
	},

	postSala: async (token: string) => {
		const isCreated = await api
			.post<SalaType>('sala', '', { headers: { Authorization: token } })
			.then(() => true)
			.catch((error: AxiosError) => {
				if (error.response != null && error.response.status === 401) {
					return 'Unauthorized';
				} else {
					return false;
				}
			});

		return isCreated;
	},

	deleteSala: async (token: string, id: number) => {
		const isDeleted = await api
			.delete<SalaType>(`sala/${id}`, { headers: { Authorization: token } })
			.then(() => true)
			.catch((error: any) => {
				if (error.response != null && error.response.status === 400) {
					return error.response.data.message as string;
				}
				if (error.response != null && error.response.status === 401) {
					return 'Unauthorized';
				} else {
					return false;
				}
			});
		return isDeleted;
	}
};
