import { Produto } from "../produto";

export type ProdutoEntity = {
	id: number;
	id_pai: number | null;
	codigo: string | null;
	codigo_pai: string | null;
	cor: string | null;
	estoque: number | null;
	peso: number | null;
	preco_custo: number | null;
	preco_venda: number | null;
	nome: string | null;
};

export function converterProduto(produto: Produto): ProdutoEntity {
	const entity: ProdutoEntity = {
		id: produto.id,
		id_pai: produto.idPai,
		codigo: produto.codigo,
		codigo_pai: produto.codigoPai,
		cor: produto.cor,
		estoque: produto.quantidade,
		peso: produto.peso,
		preco_custo: produto.precoCusto,
		preco_venda: produto.precoVenda,
		nome: produto.nome,
	};

	return entity;
}
