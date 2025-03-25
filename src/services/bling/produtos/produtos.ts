/*	GET	/produtos

	Obtém produtos paginados.

	https://developer.bling.com.br/referencia#/Produtos/get_produtos
*/
export type ParametrosObterProdutos = {
	pagina?: number;
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

export async function obterProdutos(
	parametrosObterProdutos: ParametrosObterProdutos
) {
	try {
		const parametros = Object.entries(parametrosObterProdutos)
			.map(([key, value]) => `${key}=${value}`)
			.join("&");

		const response = await fetch(
			`${process.env.BLING_URL}/produtos?${parametros}`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${process.env.BLING_ACCESS_CODE}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// Parse the JSON data
		const json = await response.json();

		return json;
	} catch (error) {
		console.error("Error fetching user data:", error);
		throw error;
	}

	return false;
}

/*
	GET	/estoques/saldos/

	Obtém o saldo em estoque de produtos, em todos os depósitos.

	Parâmetros:
		- IDs dos produtos*		|	idsProdutos[]	|	array[integer]
		- Códigos dos Produtos	|	codigos[]		|	array[string]

	https://developer.bling.com.br/referencia#/Estoques/get_estoques_saldos
*/
export async function buscarSaldos() {
	try {
		const response = await fetch(`${process.env.BLING_URL}"/estoques/saldos"`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${process.env.BLING_ACCESS_CODE}`,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// Parse the JSON data
		const json = await response.json();

		return json;
	} catch (error) {
		console.error("Error fetching user data:", error);
		throw error;
	}

	return false;
}
