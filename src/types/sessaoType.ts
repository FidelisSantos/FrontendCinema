import { FilmeType } from './filmeType';
import { SalaType } from './salaType';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface SessaoType {
	id: number;
	init: Date;
	finish: Date;
	status: string;
	filme: FilmeType;
	sala: SalaType;
}
