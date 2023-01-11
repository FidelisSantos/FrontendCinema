import { TagType } from "./tagType";

export type FilmeType = {
  id: number;
  titulo: string;
  linkImagem: string;
  descricao: string;
  tempoDeFilme: number;
  tags: TagType[];
}