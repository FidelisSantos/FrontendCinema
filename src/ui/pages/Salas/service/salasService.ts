import { AxiosError } from 'axios';

import { api } from '../../../../api/api';
import { RoomType } from '../../../../types/roomType';

export const salaService = {
	getSalaList: async (token: string) => {
		const salas = await api
			.get<RoomType[]>('sala', { headers: { Authorization: token } })
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

	postSala: async (name: string, token: string) => {
		const isCreated = await api
			.post<RoomType>(
				'sala',
				{ name: name },
				{ headers: { Authorization: token } }
			)
			.then(() => true)
			.catch((error) => {
				if (error.response != null && error.response.status === 401) {
					return 'Unauthorized';
				} else if (error.response === null || error.response.status === 500) {
					return false;
				} else {
					return error.response.data.message;
				}
			});

		return isCreated;
	},

	updateSala: async (id: number, name: string, token: string) => {
		const isUpdate = await api
			.patch<RoomType>(
				`sala/${id}`,
				{ name: name },
				{ headers: { Authorization: token } }
			)
			.then(() => true)
			.catch((error) => {
				if (error.response.status === 401) {
					return 'Unauthorized';
				} else if (error.response.status === 500) {
					return false;
				} else {
					return error.response.data.message;
				}
			});

		return isUpdate;
	},

	deleteSala: async (token: string, id: number) => {
		const isDeleted = await api
			.delete<RoomType>(`sala/${id}`, { headers: { Authorization: token } })
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
