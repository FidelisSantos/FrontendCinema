import { useState } from 'react';
import uuidv4 from 'uuidv4';

import { MovieType } from '../../../../types/movieType';
import { PostFilmeType } from '../../../../types/postMovieType';
import { RoomType } from '../../../../types/roomType';
import { TagType } from '../../../../types/tagType';
import { tagService } from '../../Tags/service/tagService';
import { filmesService } from '../service/filmesService';

export function useFilmes() {
	const [filmes, setFilmes] = useState<MovieType[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [tags, setTags] = useState<TagType[]>([]);
	const imagesTypes = ['image/jpeg', 'image/jpg', 'image/png'];
	const [isDisabled, setIsDisabled] = useState(false);
	const filmeSearch: MovieType[] = [];
	const [search, setSearch] = useState('');

	const getFilmesList = async () => {
		setIsDisabled(false);
		setErrorMessage('');
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await filmesService.getFilmes(token);
			if (response == 'Unauthorized') {
				setErrorMessage('token');
				localStorage.removeItem('token');
			} else if (response == 'Error') {
				setErrorMessage('Erro ao Listar os filmes');
				setError(true);
			} else {
				setFilmes(response);
				getTagsList();
			}
		} else setErrorMessage('token');
	};

	const getTagsList = async () => {
		setErrorMessage('');
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await tagService.getTag(token);
			if (response == 'Unauthorized') {
				setErrorMessage('token');
				localStorage.removeItem('token');
				return;
			} else if (response == 'Error') {
				setErrorMessage('Erro ao Listar os filmes');
				setError(true);
				return;
			}
			setTags(response);
		} else {
			setErrorMessage('token');
		}
		setLoading(false);
	};

	const deleteFilme = async (id: number, image: string) => {
		setErrorMessage('');
		setLoading(true);
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await filmesService.deleteFilme(token, id);
			if (response == 'Unauthorized') {
				localStorage.removeItem('token');
				setErrorMessage('token');
			} else if (!response) {
				setErrorMessage('Erro ao deletear o filmes');
				setError(true);
			} else if (response === true) {
				getFilmesList();
				await filmesService.deleteImageUrl(image);
			} else {
				const messageError = response
					? (response as string)
					: 'Erro ao deletar o filme';
				setErrorMessage(messageError);
				setError(true);
			}
			setLoading(false);
		} else {
			setErrorMessage('token');
		}
		setLoading(false);
	};

	const createFilme = async (
		titulo: string,
		tempoDeFilme: number,
		tags: number[],
		descricao: string,
		imagem: string,
		classificacao: string
	) => {
		setErrorMessage('');
		setError(false);
		setLoading(true);
		if (+classificacao == 0) {
			setErrorMessage('Favor escolher uma classificação');
			setError(true);
			setLoading(false);
			return;
		}
		if (tags.length == 0) {
			setErrorMessage('Favor escolher as Tags');
			setError(true);
			setLoading(false);
			return;
		}
		const body: PostFilmeType = {
			title: titulo,
			imageLink: imagem,
			description: descricao,
			movieTime: tempoDeFilme,
			classification: classificacao,
			tags
		};
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await filmesService.createFilme(token, body);
			if (response == 'Unauthorized') {
				localStorage.removeItem('token');
				setErrorMessage('token');
			} else if (response === true) {
				getFilmesList();
				return;
			} else if (!response) {
				setErrorMessage('Erro ao criar');
				setError(true);
			} else {
				const messageError = response
					? (response as string)
					: 'Erro ao criar o filme';
				setErrorMessage(messageError);
				setError(true);
			}
		} else setErrorMessage('token');
		setLoading(false);
	};

	const updateFilme = async (
		titulo: string,
		tempoDeFilme: number,
		tags: number[],
		descricao: string,
		imagem: string,
		id: number,
		oldImage: string,
		classificacao: string
	) => {
		setErrorMessage('');
		setLoading(true);
		const body: PostFilmeType = {
			title: titulo,
			imageLink: imagem,
			description: descricao,
			movieTime: tempoDeFilme,
			classification: classificacao,
			tags
		};
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			if (classificacao == '0') {
				setError(true);
				setErrorMessage('Favor informar a classificação');
				setLoading(false);
			}
			const response = await filmesService.patchFilme(token, body, id);
			if (response == 'Unauthorized') {
				localStorage.removeItem('token');
				setErrorMessage('token');
			} else if (response === true) {
				getFilmesList();
				if (imagem != oldImage) {
					await filmesService.deleteImageUrl(oldImage);
				}
			} else if (!response) {
				setErrorMessage('Erro ao deletar');
				setError(true);
			} else {
				const messageError = response
					? (response as string)
					: 'Erro ao deletar o filme';
				setErrorMessage(messageError);
				setError(true);
			}
			setLoading(false);
		} else {
			setErrorMessage('token');
		}
		setLoading(false);
	};

	const createUrl = async (
		imagem: File,
		titulo: string,
		tempoDeFilme: number,
		tags: number[],
		descricao: string,
		classificacao: string
	) => {
		setError(false);
		setLoading(true);
		if (+classificacao == 0) {
			setErrorMessage('Favor escolher uma classificação');
			setError(true);
			setLoading(false);
			return;
		}
		if (tags.length == 0) {
			setErrorMessage('Favor escolher as Tags');
			setError(true);
			setLoading(false);
			return;
		}
		if (imagem && imagem.size > 0 && imagesTypes.includes(imagem.type)) {
			const firebaseId = uuidv4();
			const linkImagem = await filmesService.createFirebaseUrl(
				firebaseId,
				imagem
			);
			if (linkImagem === 'Erro gerar Url') {
				setErrorMessage(linkImagem);
				setError(true);
				setLoading(false);
				return;
			}
			await createFilme(
				titulo,
				tempoDeFilme,
				tags,
				descricao,
				linkImagem,
				classificacao
			);
		} else {
			setErrorMessage('Arquivo inválido');
			setError(true);
			setLoading(false);
		}
	};

	const updateUrl = async (
		id: number,
		titulo: string,
		tempoDeFilme: number,
		tags: number[],
		descricao: string,
		oldImage: string,
		newImage: File,
		classificacao: string
	) => {
		setError(false);
		setLoading(true);
		if (newImage && newImage.size > 0 && imagesTypes.includes(newImage.type)) {
			const firebaseId = uuidv4();
			const linkImagem = await filmesService.createFirebaseUrl(
				firebaseId,
				newImage
			);
			if (linkImagem === 'Erro gerar Url') {
				setErrorMessage(linkImagem);
				setError(true);
				setLoading(false);
				return;
			}
			await updateFilme(
				titulo,
				tempoDeFilme,
				tags,
				descricao,
				linkImagem,
				id,
				oldImage,
				classificacao
			);
		} else {
			setErrorMessage('Arquivo inválido');
			setError(true);
			setLoading(false);
		}
	};

	const searchFilme = (search: string) => {
		if (!search) {
			getFilmesList();
			return;
		}
		const searchFilme = search;
		filmes.forEach((filme) => {
			if (
				filme.title
					.toLocaleLowerCase()
					.includes(searchFilme.toLocaleLowerCase()) &&
				filmeSearch.findIndex((filmeSearch) => filmeSearch.id == filme.id) < 0
			) {
				filmeSearch.push(filme);
			}
			filme.tags.forEach((tag) => {
				if (
					tag.tag
						.toLocaleLowerCase()
						.includes(searchFilme.toLocaleLowerCase()) &&
					filmeSearch.findIndex((filmeSearch) => filmeSearch.id == filme.id) < 0
				) {
					filmeSearch.push(filme);
				}
			});
		});
		if (filmeSearch.length === 0) {
			setError(true);
			setErrorMessage('Nenhum filme encontrado');
		} else setFilmes(filmeSearch);

		setIsDisabled(true);
	};

	return {
		filmes,
		loading,
		error,
		setError,
		getFilmesList,
		deleteFilme,
		createFilme,
		isOpen,
		setIsOpen,
		tags,
		updateFilme,
		errorMessage,
		setErrorMessage,
		createUrl,
		updateUrl,
		searchFilme,
		isDisabled,
		setIsDisabled,
		search,
		setSearch
	};
}
