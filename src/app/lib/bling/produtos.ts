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

		// Parse the JSON data
		const json = await response.json();

		return json;
	} catch (error) {
		console.error("Error fetching user data:", error);
		throw error;
	}
}

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
