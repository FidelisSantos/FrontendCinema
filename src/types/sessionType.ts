import { MovieType } from './movieType';
import { RoomType } from './roomType';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface SessionType {
	id: number;
	init: Date;
	finish: Date;
	status: string;
	movie: MovieType;
	room: RoomType;
}
