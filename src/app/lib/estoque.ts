import postgres from "postgres";

import { Produto } from "@/app/types/Escriva/Produto";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function inserirProduto(produto: Produto) {
	try {
		const atualizadoEm = new Date().toLocaleString();

		console.log(produto);

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
