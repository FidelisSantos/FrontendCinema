import { useState } from 'react';

import { TagType } from '../../../../types/tagType';
import { tagService } from '../service/tagService';

export function useTags() {
	const [loading, setLoading] = useState<boolean>(true);
	const [tags, setTags] = useState<TagType[]>([]);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const tagsSearch: TagType[] = [];
	const [search, setSearch] = useState('');

	const getTagsList = async () => {
		setErrorMessage('');
		setIsDisabled(false);
		setSearch('');
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await tagService.getTag(token);
			if (response == 'Unauthorized') {
				setErrorMessage('token');
				localStorage.removeItem('token');
			} else if (response == 'Error') {
				setErrorMessage('Erro ao Listar a sala');
				setError(true);
			} else setTags(response);
		} else {
			setErrorMessage('token');
		}
		setLoading(false);
	};

	const deleteTag = async (id: number) => {
		setErrorMessage('');
		setError(false);
		setLoading(true);
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await tagService.deleteTag(id, token);
			if (response == 'Unauthorized') {
				localStorage.removeItem('token');
				setErrorMessage('token');
				setLoading(false);
			} else if (!response) {
				setErrorMessage('Erro ao deletar a tag');
				setError(true);
			} else if (response === true) {
				getTagsList();
				return;
			} else {
				const messageError = response
					? (response as string)
					: 'Erro ao deletar a tag';
				setErrorMessage(messageError);
				setError(true);
			}
			setLoading(false);
		} else {
			setErrorMessage('token');
		}
		setLoading(false);
	};

	const createTag = async (newTag: string) => {
		const body: Partial<TagType> = {
			tag: newTag
		};
		setErrorMessage('');
		setLoading(true);
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await tagService.createTag(token, body);
			if (response == 'Unauthorized') {
				localStorage.removeItem('token');
				setErrorMessage('token');
			} else if (response === true) {
				getTagsList();
				return;
			} else if (!response) {
				setErrorMessage('Erro ao criar tag');
				setError(true);
			} else {
				const messageError = response
					? (response as string)
					: 'Erro ao deletar a criar tag';
				setErrorMessage(messageError);
				setError(true);
			}
			setLoading(false);
		} else {
			setErrorMessage('token');
		}
		setLoading(false);
	};

	const updateTag = async (newTag: string, id: number) => {
		const body: Partial<TagType> = {
			tag: newTag
		};
		setErrorMessage('');
		setLoading(true);
		const token = `Bearer ${localStorage.getItem('token')}`;
		if (token) {
			const response = await tagService.updateTag(token, body, id);
			if (response == 'Unauthorized') {
				localStorage.removeItem('token');
				setErrorMessage('token');
			} else if (response === true) {
				getTagsList();
				return;
			} else if (!response) {
				setErrorMessage('Erro ao atualizar');
				setError(true);
			} else {
				const messageError = response
					? (response as string)
					: 'Erro ao deletar ao atualizar tag';
				setErrorMessage(messageError);
				setError(true);
			}
			setLoading(false);
		} else {
			setErrorMessage('token');
		}
		setLoading(false);
	};

	const searchTags = (search: string) => {
		if (!search) {
			getTagsList();
			return;
		}
		const searchFilme = search;
		tags.forEach((tag) => {
			if (
				tag.tag.toLocaleLowerCase().includes(searchFilme.toLocaleLowerCase())
			) {
				tagsSearch.push(tag);
			}
		});
		if (tagsSearch.length === 0) {
			setError(true);
			setErrorMessage('Nenhuma tag encontrada');
		} else setTags(tagsSearch);

		setIsDisabled(true);
	};

	return {
		loading,
		tags,
		error,
		setError,
		getTagsList,
		isOpen,
		setIsOpen,
		deleteTag,
		createTag,
		updateTag,
		errorMessage,
		setErrorMessage,
		isDisabled,
		setIsDisabled,
		search,
		setSearch,
		searchTags
	};
}
