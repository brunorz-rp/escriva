import { EstoqueGetAllResponseDTO } from "../estoque/EstoqueGetAllResponseDTO";

export type ProdutosDadosBaseDTO = {
	id: number;
	idProdutoPai?: number;
	nome: string;
	codigo: string;
	precoCusto?: number;
	estoque?: EstoqueGetAllResponseDTO;
	tipo: string;
	situacao: string;
	formato: string;
	descricaoCurta?: string;
	imagemURL?: string;
};
