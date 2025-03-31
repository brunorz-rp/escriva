import postgres from "postgres";
import { Produto } from "../../types/Escriva/Produto/Produto";
import { ProdutoTabelaEstoqueDTO } from "../../types/Escriva/Produto/ProdutoTabelaEstoqueDTO";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function inserirProdutos(produtos: Array<Produto>) {
	produtos.forEach((produto) => inserirProduto(produto));
}

export async function inserirProduto(produto: Produto) {
	try {
		const atualizadoEm = new Date().toLocaleString();

		await sql`
			INSERT INTO
				produtos (id, nome, cor, codigo, preco_custo, preco_venda, estoque, atualizado_em)
			VALUES
				(${produto.id}, ${produto?.nome}, ${produto?.cor}, ${produto?.codigo}, ${produto?.precoCusto}, ${produto?.precoVenda}, ${produto?.estoque}, ${atualizadoEm})`;
	} catch (error) {
		console.error("Erro ao inserir produto:");
		console.error(produto);
		console.error(error);
	}
}

export async function buscarProdutosFiltrados(filtro: string) {
	try {
		const produtosTabelaEstoqueDTO = await sql<ProdutoTabelaEstoqueDTO[]>`
        SELECT
          produtos.id,
		  produtos.codigo_pai,
          produtos.codigo,
          produtos.cor,
          produtos.estoque,
          produtos.preco_custo,
          produtos.preco_venda,
          produtos.nome,
          produtos.atualizado_em
        FROM
          produtos
        WHERE
          produtos.codigo ILIKE ${`%${filtro}%`} OR
          produtos.cor ILIKE ${`%${filtro}%`}
        ORDER BY
          produtos.codigo DESC
      `;

		const produtos: Array<Produto> = produtosTabelaEstoqueDTO.map(
			(produto: ProdutoTabelaEstoqueDTO) => ({
				id: produto.id,
				codigoPai: produto.codigo_pai,
				codigo: produto.codigo,
				cor: produto.cor,
				estoque: produto.estoque,
				precoCusto: produto.preco_custo,
				precoVenda: produto.preco_venda,
				nome: produto.nome,
				atualizadoEm: produto.atualizado_em,
			})
		);

		return produtos;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch produtos.");
	}
}

export async function listarProdutos() {
	try {
		const data = await sql<Produto[]>`
			SELECT
				*
			FROM
				produtos
			ORDER BY
				produtos.codigo ASC`;

		return data;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error();
	}
}
