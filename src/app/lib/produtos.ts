"use server";

import { ProdutosDadosBaseDTO } from "@/app/types/Bling/produto/ProdutosDadosBaseDTO";
import {
	converterProdutosDadosBaseDTO,
	Produto,
} from "@/app/types/Escriva/produto";

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
		await new Promise((resolve) => setTimeout(resolve, 2000));

		const { data } = await BlingAPI.getProdutos(parameters);

		return data.map((produtoDadosBaseDTO: ProdutosDadosBaseDTO) =>
			converterProdutosDadosBaseDTO(produtoDadosBaseDTO)
		);
	} catch (error) {
		throw error;
	}
}

export async function fetchAllProductsFromBling(
	parameters: ParametrosObterProdutos
): Promise<Produto[]> {
	try {
		await new Promise((resolve) => setTimeout(resolve, 2000));

		parameters.pagina = 0;
		const { data } = await BlingAPI.getProdutos(parameters);

		const products = [];

		products.push(data);

		while (data.length > 99) {
			await new Promise((resolve) => setTimeout(resolve, 2000));

			parameters.pagina++;
			const { data } = await BlingAPI.getProdutos(parameters);

			products.push(data);
		}

		return products.map((produtoDadosBaseDTO: ProdutosDadosBaseDTO) =>
			converterProdutosDadosBaseDTO(produtoDadosBaseDTO)
		);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

const BlingAPI = {
	/*	
		https://developer.bling.com.br/referencia#/Produtos/get_produtos
	*/
	getProdutos: async (parametrosObterProdutos: ParametrosObterProdutos) => {
		try {
			const parametros = Object.entries(parametrosObterProdutos)
				.map(([key, value]) => `${key}=${value}`)
				.join("&");

			const url = `${process.env.BLING_URL}/produtos?${parametros}`;

			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${process.env.BLING_ACCESS_CODE}`,
				},
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
