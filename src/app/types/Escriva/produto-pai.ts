import { Produto } from "./produto";

export type ProdutoPai = {
	codigo: string;
	branco: Produto | undefined;
	preto: Produto | undefined;
	natural: Produto | undefined;
	anodizado: Produto | undefined;
	amadeirado: Produto | undefined;
};

export type ProductRecord = Record<string, Produto>;

export type ProductRecords = Record<string, ProductRecord>;
