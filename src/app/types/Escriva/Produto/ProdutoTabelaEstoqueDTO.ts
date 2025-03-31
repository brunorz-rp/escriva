export type ProdutoTabelaEstoqueDTO = {
	id: number;
	codigo_pai: string | null;
	codigo: string;
	cor: string | null;
	estoque: number | null;
	preco_custo: number | null;
	preco_venda: number | null;
	nome: string;
	atualizado_em: Date;
};
