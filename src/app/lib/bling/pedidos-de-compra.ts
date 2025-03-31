export type ParametrosObterPedidosCompras = {
	pagina: number;
	limite: number;
	idFornecedor?: Array<number>;
	valorSituacao?: Array<number>;
	dataInicial?: string;
	dataFinal?: string;
};

export async function obterPedidosDeCompra(
	parametrosObterPedidosCompras: ParametrosObterPedidosCompras
) {
	try {
		const parametros = Object.entries(parametrosObterPedidosCompras)
			.map(([key, value]) => `${key}=${value}`)
			.join("&");

		const url = `${process.env.BLING_URL}/pedidos/compras?${parametros}`;

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

export async function obterPedidosDeCompraPorID(idPedidoCompra: number) {
	try {
		const url = `${process.env.BLING_URL}/pedidos/compras/${idPedidoCompra}`;

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
