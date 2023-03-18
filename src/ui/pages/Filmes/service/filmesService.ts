import { AxiosError } from 'axios';
import {
	getDownloadURL,
	uploadBytes,
	deleteObject,
	ref
} from 'firebase/storage';

import { api } from '../../../../api/api';
import { storage } from '../../../../firebase/firebase-app';
import { MovieType } from '../../../../types/movieType';
import { PostFilmeType } from '../../../../types/postMovieType';

export const filmesService = {
	getFilmes: async (token: string) => {
		const filmes = await api
			.get<MovieType[]>('filme', { headers: { Authorization: token } })
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
		return filmes;
	},

	deleteFilme: async (token: string, id: number) => {
		const isDeleted = await api
			.delete(`filme/${id}`, { headers: { Authorization: token } })
			.then(() => true)
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					return 'Unauthorized';
				}
				if (error.response && error.response.status === 500) {
					return false;
				} else return error.response.data.message;
			});

		return isDeleted;
	},

	createFilme: async (token: string, body: PostFilmeType) => {
		const Create = await api
			.post('filme', body, { headers: { Authorization: token } })
			.then(() => true)
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					return 'Unauthorized';
				}
				if (error.response && error.response.status === 500) {
					return false;
				} else return error.response.data.message;
			});
		return Create;
	},

	patchFilme: async (token: string, body: PostFilmeType, id: number) => {
		const UpdateFilme = await api
			.patch(`filme/${id}`, body, { headers: { Authorization: token } })
			.then(() => true)
			.catch((error) => {
				if (error.response && error.response.status === 401) {
					return 'Unauthorized';
				}
				if (error.response && error.response.status === 500) {
					return false;
				} else return error.response.data.message;
			});
		return UpdateFilme;
	},

	createFirebaseUrl: async (titulo: string, imagem: File) => {
		const linkImageFolder = ref(storage, `FilmesImagens/${titulo}`);
		try {
			const upload = await uploadBytes(linkImageFolder, imagem);
			return await getDownloadURL(upload.ref);
		} catch {
			return 'Erro gerar Url';
		}
	},

	deleteImageUrl: async (image: string) => {
		const fileRef = ref(storage, image);
		await deleteObject(fileRef)
			.then(() => {
				null;
			})
			.catch(() => {
				null;
			});
	}
};
