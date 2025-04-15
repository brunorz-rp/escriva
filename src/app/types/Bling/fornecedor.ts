export type Fornecedor = {
	id: number
}

type FornecedorContatoDTO = {
	id: string;
	nome?: string;
}

export type ProdutoFornecedorDTO = {
	id: number;
	contato?: FornecedorContatoDTO
	codigo?: string;
	precoCusto?: number;
	precoCompra?: number;
}

export type PedidosComprasFornecedorDTO = {
	id: number;
};