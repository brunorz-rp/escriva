"use server";

import postgres from "postgres";
import { getValidAccessCode } from "./bling/authorization";
import {
	ProdutosDadosBaseDTO,
	ProdutosDadosDTO,
} from "../types/Bling/produtos";
import {
	ProdutoEntity,
	converterProduto,
} from "../types/Escriva/database/produto";
import {
	Produto,
	converterProdutoEntity,
	converterProdutosDadosBaseDTO,
	converterProdutosDadosDTO,
} from "../types/Escriva/produto";

const BATCH_SIZE = 1000; // Adjust based on your DB performance

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

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

export async function upsertProduct(produto: Produto) {
	try {
		const values = converterProduto(produto);

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
				peso = EXCLUDED.peso,
				preco_custo = EXCLUDED.preco_custo,
				preco_venda = EXCLUDED.preco_venda,
				nome = EXCLUDED.nome
		`;
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
						id_pai 	= COALESCE(EXCLUDED.id_pai, produtos.id_pai),
						codigo	= COALESCE(EXCLUDED.codigo, produtos.codigo),
						codigo_pai	= COALESCE(EXCLUDED.codigo_pai, produtos.codigo_pai),
						cor			= COALESCE(EXCLUDED.cor, produtos.cor),
						estoque		= COALESCE(EXCLUDED.estoque, produtos.estoque),
						peso		= COALESCE(EXCLUDED.peso, produtos.peso),
						preco_custo	= COALESCE(EXCLUDED.preco_custo, produtos.preco_custo),
						preco_venda = COALESCE(EXCLUDED.preco_venda, produtos.preco_venda),
						nome 		= COALESCE(EXCLUDED.nome, produtos.nome),
						id_categoria= COALESCE(EXCLUDED.id_categoria, produtos.id_categoria)
				`;
			});
		}
	} catch (error) {
		throw error;
	}
}

/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*
 *	V		Métodos que interagem com o Bling	V		*
 *	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

export type ParametrosObterProdutos = {
	pagina: number;
	limite?: number;
	criterio?: number;
	tipo?: string;
	idComponente?: number;
	dataInclusaoInicial?: string;
	dataInclusaoFinal?: string;
	dataAlteracaoInicial?: string;
	dataAlteracaoFinal?: string;
	idCategoria?: number;
	idLoja?: string;
	nome?: string;
	idsProdutos?: number[];
	codigos?: number[];
};

export async function fetchProductsFromBling(
	parameters: ParametrosObterProdutos
): Promise<Produto[]> {
	try {
		const produtos = await BlingAPI.getProdutos(parameters);

		return produtos.map((produtoDadosBaseDTO: ProdutosDadosBaseDTO) =>
			converterProdutosDadosBaseDTO(produtoDadosBaseDTO)
		);
	} catch (error) {
		throw error;
	} finally {
		await new Promise((resolve) => setTimeout(resolve, 3000));
	}
}

export async function fetchProductFromBling(id: number): Promise<Produto> {
	try {
		const produto = await BlingAPI.getProdutosByID(id);

		return converterProdutosDadosDTO(produto);
	} catch (error) {
		throw error;
	} finally {
		await new Promise((resolve) => setTimeout(resolve, 3000));
	}
}

interface ComparacaoProduto extends Produto {
	pesoLiquidoNovo: number;
	precoNovo: number;
}

export async function updateProductFromBling(produto: ComparacaoProduto) {
	try {
		await BlingAPI.updateProduto({
			id: produto.id,
			pesoLiquido: produto.pesoLiquidoNovo,
			preco: produto.precoNovo,
		});
	} catch (error) {
		throw error;
	} finally {
		await new Promise((resolve) => setTimeout(resolve, 3000));
	}
}

const BlingAPI = {
	/*	
		https://developer.bling.com.br/referencia#/Produtos/get_produtos
	*/
	getProdutos: async (
		parametrosObterProdutos: ParametrosObterProdutos
	): Promise<ProdutosDadosBaseDTO[]> => {
		try {
			const parametros = Object.entries(parametrosObterProdutos)
				.map(([key, value]) => `${key}=${value}`)
				.join("&");

			const url = `${process.env.BLING_API_URL}/produtos?${parametros}`;

			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${await getValidAccessCode()}`,
				},
			});

			if (!response.ok) {
				console.log(response)
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const json = await response.json();

			return json.data;
		} catch (error) {
			throw error;
		}
	},

	/*
		https://developer.bling.com.br/referencia#/Produtos/get_produtos__idProduto_
	*/
	getProdutosByID: async (idProduto: number): Promise<ProdutosDadosDTO> => {
		try {
			const url = `${process.env.BLING_API_URL}/produtos/${idProduto}`;

			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${await getValidAccessCode()}`,
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const json = await response.json();

			return json.data;
		} catch (error) {
			throw error;
		}
	},

	/*	
		https://developer.bling.com.br/referencia#/Produtos/patch_produtos__idProduto_
	*/
	updateProduto: async (produto: ProdutosDadosDTO) => {
		try {
			const { id, ...body } = produto;

			const url = `${process.env.BLING_API_URL}/produtos/${id}`;

			console.log(JSON.stringify(url));
			console.log(JSON.stringify(body));

			const response = await fetch(url, {
				method: "PATCH",
				headers: {
					"Accept": "application/json",
					"Authorization": `Bearer ${await getValidAccessCode()}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const json = await response.json();

			return json;
		} catch (error) {
			throw error;
		}
	},
};
