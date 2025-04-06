import { EstoqueGetAllResponseDTO } from "../estoque/EstoqueGetAllResponseDTO";

export type ProdutosDadosBaseDTO = {
	id: number;
	idProdutoPai?: number;
	codigo: string;
	nome: string;
	precoCusto?: number;
	estoque?: EstoqueGetAllResponseDTO;
	tipo: string;
	situacao: string;
	formato: string;
	descricaoCurta?: string;
	imagemURL?: string;
};
