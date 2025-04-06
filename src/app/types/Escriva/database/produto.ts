export type ProdutoEntity = {
	id: number;
	id_pai: number | null;
	codigo: string | null;
	codigo_pai: string | null;
	cor: string | null;
	estoque: number | null;
	preco_custo: number | null;
	preco_venda: number | null;
	nome: string | null;
};
