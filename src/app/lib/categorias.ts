"use server";

import { getValidAccessCode } from "./bling/authorization";

/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*
 *	V		Métodos que interagem com o Bling	V		*
 *	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

export async function fetchProductsCategoriesFromBling() {
	try {
		const categorias = await BlingAPI.getCategoriasProdutos();
		console.log(categorias);

		return categorias;
	} catch (error) {
		throw error;
	} finally {
		await new Promise((resolve) => setTimeout(resolve, 2000));
	}
}

const BlingAPI = {
	/*	
		https://developer.bling.com.br/referencia#/Categorias%20-%20Produtos/get_categorias_produtos
	*/
	getCategoriasProdutos: async () => {
		try {
			const accessCode: string = await getValidAccessCode();

			const url = `${process.env.BLING_API_URL}/categorias/produtos`;

			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${accessCode}`,
				},
			});

			if (!response.ok) {
				console.log(response);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const json = await response.json();

			return json.data;
		} catch (error) {
			console.log("ERROR thrown on getCategoriasProdutos:");
			console.log(error);
			throw error;
		}
	},
};
