import { type TagType } from './tagType';

export type MovieType = {
	id: number;
	title: string;
	imageLink: string;
	description: string;
	movieTime: number;
	classification: string;
	tags: TagType[];
};
