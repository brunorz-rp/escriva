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
	id_categoria: number | null;
};

export function converterProduto(produto: Produto): ProdutoEntity {
	const entity: ProdutoEntity = {
		id: produto.id,
		id_pai: produto.idPai ?? null,
		codigo: produto.codigo ?? null,
		codigo_pai: produto.codigoPai ?? null,
		cor: produto.cor ?? null,
		estoque: produto.quantidade ?? null,
		peso: produto.peso ?? null,
		preco_custo: produto.precoCusto ?? null,
		preco_venda: produto.precoVenda ?? null,
		nome: produto.nome ?? null,
		id_categoria: produto.idCategoria ?? null,
	};

	return entity;
}
