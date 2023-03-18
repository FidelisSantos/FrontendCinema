import { api } from '../../../../api/api';
import { MovieSessionsType } from '../../../../types/movieSessionsType';

export const homeService = {
	getFilmesSessoes: async () => {
		const data = await api
			.get<MovieSessionsType[]>('filmesessao')
			.then((response) => response.data)
			.catch(() => {
				return null;
			});
		return data;
	}
};
