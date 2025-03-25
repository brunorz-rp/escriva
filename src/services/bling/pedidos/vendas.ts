const baseURL = process.env.BLING_URL;

export async function fetchPedidosDeVenda() {
	const URL = `${baseURL}/pedidos/vendas`;

	try {
		const response = await fetch(URL, {
			method: "GET",
			headers: {
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
