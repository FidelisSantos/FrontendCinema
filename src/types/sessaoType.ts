import { FilmeType } from "./filmeType";
import { SalaType } from "./salaType";

export type SessaoType = {
  id: number;
  init: Date;
  finish: Date;
  status: string;
  filme: FilmeType;
  sala: SalaType;
}