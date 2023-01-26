import { api } from '../api/api';
import { LoginType } from '../types/LoginType';

export const appService = {
	loginAdm: async (login: LoginType) => {
		const token = await api
			.post<string>('login', login)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((response: any) => response.data.token)
			.catch((error: Error) => {
				console.error(error.message);
				return '';
			});
		return token;
	}
};
