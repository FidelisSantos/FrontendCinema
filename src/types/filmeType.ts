import { type TagType } from './tagType';

export type FilmeType = {
	id: number;
	titulo: string;
	linkImagem: string;
	descricao: string;
	tempoDeFilme: number;
	classificacao: string;
	tags: TagType[];
};
