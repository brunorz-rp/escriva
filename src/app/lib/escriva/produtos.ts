"use server";

import postgres from "postgres";

import { converterProdutoEntity, Produto } from "../../types/Escriva/produto";
import {
	converterProduto,
	ProdutoEntity,
} from "@/app/types/Escriva/database/produto-entity";

const BATCH_SIZE = 1000; // Adjust based on your DB performance

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function insertProduct(produto: Produto) {
	try {
		await sql`
			INSERT INTO produtos (
				id, id_pai,
				codigo, codigo_pai,
				cor, estoque,
				preco_custo, preco_venda,
				nome
			)
			VALUES (
				${produto.id}, ${produto?.idPai},
				${produto.codigo}, ${produto?.codigoPai},
				${produto?.cor}, ${produto?.quantidade},
				${produto?.precoCusto}, ${produto?.precoVenda},
				${produto?.nome}
			)
			ON CONFLICT
				(id)
			DO UPDATE SET
				id_pai = EXCLUDED.id_pai,
				codigo = EXCLUDED.codigo,
				codigo_pai = EXCLUDED.codigo_pai,
				cor = EXCLUDED.cor,
				estoque = EXCLUDED.estoque,
				preco_custo = EXCLUDED.preco_custo,
				preco_venda = EXCLUDED.preco_venda,
				nome = EXCLUDED.nome
			`;
	} catch (error) {
		throw error;
	}
}

export async function getProducts(filter?: string): Promise<Produto[]> {
	try {
		let produtos = undefined;

		if (!filter) {
			produtos = await sql<
				ProdutoEntity[]
			>`SELECT * FROM produtos ORDER BY produtos.codigo ASC`;
		} else {
			produtos = await sql<[]>`	
			SELECT * FROM produtos
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
		throw error;
	}
}

export async function upsertProducts(produtos: Produto[]) {
	try {
		for (let index = 0; index < produtos.length; index += BATCH_SIZE) {
			const batch = produtos.slice(index, index + BATCH_SIZE);

			await sql.begin(async (sql) => {
				const values = batch.map((produto) => converterProduto(produto));

				await sql`
					INSERT INTO produtos
						${sql(values)}
					ON CONFLICT
						(id)
					DO UPDATE SET
						id_pai = EXCLUDED.id_pai,
						codigo = EXCLUDED.codigo,
						codigo_pai = EXCLUDED.codigo_pai,
						cor = EXCLUDED.cor,
						estoque = EXCLUDED.estoque,
						preco_custo = EXCLUDED.preco_custo,
						preco_venda = EXCLUDED.preco_venda,
						nome = EXCLUDED.nome
				`;
			});
		}
	} catch (error) {
		throw error;
	}
}
