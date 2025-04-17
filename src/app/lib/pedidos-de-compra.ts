"use server";

import postgres from "postgres";

import { PedidosComprasDTO } from "../types/Bling/pedidos-de-compra";
import {
	PedidoDeCompra,
	converterPedidosComprasDTO,
	converterPedidoCompraDTO,
} from "../types/Escriva/pedido-de-compra";

const BATCH_SIZE = 1000; // Adjust based on your DB performance

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function upsertBuyOrders(pedidos: PedidoDeCompra[]) {
	try {
		for (let index = 0; index < pedidos.length; index += BATCH_SIZE) {
			const values = pedidos.slice(index, index + BATCH_SIZE);

			await sql.begin(async (sql) => {
				await sql`
				INSERT INTO pedidos_de_compra
					${sql(values)}
				ON CONFLICT
					(id)
				DO UPDATE SET
					numero = EXCLUDED.numero,
					data = EXCLUDED.data,
					fornecedor = EXCLUDED.fornecedor,
					situacao = EXCLUDED.situacao,
					itens = EXCLUDED.itens
			`;
			});
		}
	} catch (error) {
		throw error;
	}
}

export async function getBuyOrders(filter?: string): Promise<PedidoDeCompra[]> {
	try {
		if (!filter) {
			const pedidos = await sql<
				PedidoDeCompra[]
			>`SELECT * FROM pedidos_de_compra`;

			return pedidos;
		} else {
			const pedidos = await sql<
				PedidoDeCompra[]
			>`SELECT * FROM pedidos_de_compra`;

			return pedidos;
		}
	} catch (error) {
		throw error;
	}
}

/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*
 *	V		Métodos que interagem com o Bling		V	*
 *	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

export type ParametrosObterPedidosCompras = {
	pagina: number;
	limite?: number;
	idFornecedor?: Array<number>;
	valorSituacao?: Array<number>;
	dataInicial?: string;
	dataFinal?: string;
};

export async function fetchBuyOrdersFromBling(
	parametros: ParametrosObterPedidosCompras
): Promise<PedidoDeCompra[]> {
	try {
		const { data } = await BlingAPI.getPedidosCompras(parametros);

		return data.map((pedidoDTO: PedidosComprasDTO) =>
			converterPedidosComprasDTO(pedidoDTO)
		);
	} catch (error) {
		throw error;
	} finally {
		await new Promise((f) => setTimeout(f, 2000));
	}
}

export async function fetchBuyOrderWithItensFromBling(
	id: number
): Promise<PedidoDeCompra> {
	try {
		const { data } = await BlingAPI.getPedidosComprasID(id);

		return converterPedidoCompraDTO(data);
	} catch (error) {
		throw error;
	} finally {
		await new Promise((f) => setTimeout(f, 2000));
	}
}

const BlingAPI = {
	/*
		https://developer.bling.com.br/referencia#/Pedidos%20-%20Compras/get_pedidos_compras
	*/
	getPedidosCompras: async (
		parametrosObterPedidosCompras: ParametrosObterPedidosCompras
	) => {
		try {
			const parametros = Object.entries(parametrosObterPedidosCompras)
				.map(([key, value]) => `${key}=${value}`)
				.join("&");

			const url = `${process.env.BLING_API_URL}/pedidos/compras?${parametros}`;

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

	/*
		https://developer.bling.com.br/referencia#/Pedidos%20-%20Compras/get_pedidos_compras__idPedidoCompra_
	*/
	getPedidosComprasID: async (id: number) => {
		try {
			const url = `${process.env.BLING_API_URL}/pedidos/compras/${id}`;

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
