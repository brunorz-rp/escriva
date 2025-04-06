"use server";

import postgres from "postgres";
import { converterProdutoEntity, Produto } from "../../types/Escriva/produto";
import { createClient } from "../supabase/client";
import { ProdutoEntity } from "@/app/types/Escriva/database/produto";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function inserirProdutos(produtos: Array<Produto>) {
	const supabase = createClient();

	const _produtos = produtos.map((produto) =>
		Object.fromEntries(
			Object.entries(produto).map(([key, value]) => [
				key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
				value,
			])
		)
	);

	try {
		const { data, error } = await supabase.from("produtos").insert(_produtos);

		console.log(data);
		console.log(error);
	} catch (error) {
		console.error("Erro ao inserir...");
		console.error(error);
	}
}

export async function inserirProduto(produto: Produto) {
	try {
		await sql`
			INSERT INTO produtos
					(id,
					id_pai,
					codigo,
					codigo_pai,
					cor,
					estoque,
					preco_custo,
					preco_venda,
					nome)
			VALUES (${produto.id},
					${produto?.idPai},
					${produto.codigo},
					${produto?.codigoPai},
					${produto?.cor},
					${produto?.quantidade},
					${produto?.precoCusto},
					${produto?.precoVenda},
					${produto.nome})`;
	} catch (error) {
		console.error("Erro ao inserir produto:");
		console.error(produto);
		console.error(error);
	}
}

export async function getProdutosFromEscriva(filter?: string) {
	try {
		let produtos = undefined;

		if (!filter) {
			produtos = await sql<[]>`
	
			SELECT
			  *
			FROM
			  produtos
			ORDER BY
			  produtos.codigo ASC
		  `;
		} else {
			produtos = await sql<[]>`
	
			SELECT
			  *
			FROM
			  produtos
			WHERE
			  produtos.codigo ILIKE ${`%${filter}%`} OR
			  produtos.codigo_pai ILIKE ${`%${filter}%`} OR
			  produtos.nome ILIKE ${`%${filter}%`}
			ORDER BY
			  produtos.codigo ASC
		  `;
		}

		return produtos.map((entity: ProdutoEntity) =>
			converterProdutoEntity(entity)
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to get produtos.");
	}
}
