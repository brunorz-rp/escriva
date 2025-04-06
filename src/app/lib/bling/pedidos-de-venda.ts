"use server";

import { PedidoVendaDTO } from "@/app/types/Bling/pedido-de-venda";
import {
	converterPedidosVendasDTO,
	converterPedidoVendaDTO,
	PedidoDeVenda,
} from "@/app/types/Escriva/pedido-de-venda";

export type ParametrosObterPedidosVendas = {
	pagina?: number;
	limite?: number;
	idContato?: Array<number>;
	idsSituacoes?: Array<number>;
	dataInicial?: string;
	dataFinal?: string;
	dataAlteracaoInicial?: string;
	dataAlteracaoFinal?: string;
	dataPrevistaInicial?: string;
	dataPrevistaFinal?: string;
	numero?: number;
	idLoja?: number;
	idVendedor?: number;
	idControleCaixa?: number;
	numerosLojas?: Array<number>;
};

export async function getPedidos(
	parametros: ParametrosObterPedidosVendas
): Promise<PedidoDeVenda[]> {
	parametros.pagina = 1;
	parametros.limite = 100;
	parametros.idsSituacoes = [452950, 452952];

	let response = await BlingAPI.getPedidosVendas(parametros);

	const pedidosDeVendaBling = [];

	pedidosDeVendaBling.push(response);

	while (response.length > 99) {
		parametros.pagina++;

		await new Promise((f) => setTimeout(f, 2000));

		response = await BlingAPI.getPedidosVendas(parametros);

		pedidosDeVendaBling.push(response);
	}

	const pedidosDeVenda = pedidosDeVendaBling
		.flat()
		.map((pedido) => converterPedidosVendasDTO(pedido));

	return pedidosDeVenda;
}

export async function getPedidosComItens(
	parametros: ParametrosObterPedidosVendas
): Promise<PedidoDeVenda[]> {
	const pedidosVendasBling = await getPedidos(parametros);

	const pedidosDeVenda = [];

	for (const pedidoVendaBling of pedidosVendasBling) {
		await new Promise((f) => setTimeout(f, 2000));

		const pedidoDeVendaPorID = await BlingAPI.getPedidosVendasPorID(
			pedidoVendaBling.id
		);

		const pedidoDeVenda = converterPedidoVendaDTO(pedidoDeVendaPorID);

		pedidosDeVenda.push(pedidoDeVenda);
	}

	return pedidosDeVenda;
}

export async function getPedido(
	idPedidoVenda: number
): Promise<PedidoVendaDTO> {
	return await BlingAPI.getPedidosVendasPorID(idPedidoVenda);
}

const BlingAPI = {
	/*	
		https://developer.bling.com.br/referencia#/Pedidos%20-%20Vendas/get_pedidos_vendas
	*/
	getPedidosVendas: async (
		parametrosObterPedidosVendas: ParametrosObterPedidosVendas
	) => {
		try {
			const parametros = Object.entries(parametrosObterPedidosVendas)
				.map(([key, value]) => `${key}=${value}`)
				.join("&");

			const url = `${process.env.BLING_URL}/pedidos/vendas?${parametros}`;

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

			return json.data;
		} catch (error) {
			console.error("Error fetching user data:", error);
			throw error;
		}
	},

	/*	
		https://developer.bling.com.br/referencia#/Pedidos%20-%20Vendas/get_pedidos_vendas__idPedidoVenda_
	*/
	getPedidosVendasPorID: async (
		idPedidoVenda: number
	): Promise<PedidoVendaDTO> => {
		try {
			const url = `${process.env.BLING_URL}/pedidos/vendas/${idPedidoVenda}`;

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

			return json.data;
		} catch (error) {
			console.error("Error fetching user data:", error);
			throw error;
		}
	},
};
