import { Produto } from "./produto";

export type ProdutoPai = {
	codigo: string;
	branco: Produto | undefined;
	preto: Produto | undefined;
	natural: Produto | undefined;
	anodizado: Produto | undefined;
	amadeirado: Produto | undefined;
};
