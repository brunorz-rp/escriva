"use server";

import postgres from "postgres";

import { PedidosVendasDTO } from "@/app/types/Bling/pedido-de-venda";
import {
	PedidoDeVenda,
	converterPedidosVendasDTO,
	converterPedidoVendaDTO,
} from "@/app/types/Escriva/pedido-de-venda";

const BATCH_SIZE = 1000;

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function upsertSellOrders(pedidos: PedidoDeVenda[]) {
	try {
		for (let index = 0; index < pedidos.length; index += BATCH_SIZE) {
			const values = pedidos.slice(index, index + BATCH_SIZE);

			await sql.begin(async (sql) => {
				await sql`
				INSERT INTO pedidos_de_venda
					${sql(values)}
				ON CONFLICT
					(id)
				DO UPDATE SET
					numero = EXCLUDED.numero,
					data = EXCLUDED.data,
					contato = EXCLUDED.contato,
					situacao = EXCLUDED.situacao,
					itens = EXCLUDED.itens
			`;
			});
		}
	} catch (error) {
		throw error;
	}
}

export async function getSellOrders(filter?: string): Promise<PedidoDeVenda[]> {
	try {
		if (!filter) {
			const pedidos = await sql<
				PedidoDeVenda[]
			>`SELECT * FROM pedidos_de_venda`;

			return pedidos;
		} else {
			const pedidos = await sql<
				PedidoDeVenda[]
			>`SELECT * FROM pedidos_de_venda`;

			return pedidos;
		}
	} catch (error) {
		throw error;
	}
}

/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*
 *	V		Métodos que interagem com o Bling	V		*
 *	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

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

export async function fetchSellOrdersFromBling(
	parametros: ParametrosObterPedidosVendas
): Promise<PedidoDeVenda[]> {
	try {
		const { data } = await BlingAPI.getPedidosVendas(parametros);

		return data.map((pedidoDTO: PedidosVendasDTO) =>
			converterPedidosVendasDTO(pedidoDTO)
		);
	} catch (error) {
		throw error;
	} finally {
		await new Promise((f) => setTimeout(f, 2000));
	}
}

export async function fetchSellOrderWithItensFromBling(idPedidoVenda: number) {
	try {
		const { data } = await BlingAPI.getPedidosVendasID(idPedidoVenda);

		return converterPedidoVendaDTO(data);
	} catch (error) {
		throw error;
	} finally {
		await new Promise((f) => setTimeout(f, 2000));
	}
}

/*
	`idSituacoes=6`,        // Em aberto
	`idSituacoes=9`,        // Atendido
	`idSituacoes=452951`,   // Atendido 2
	`idSituacoes=15`,       // Em andamento
	`idSituacoes=452950`,   // Em andamento 2
	`idSituacoes=454559`,	// Reservado
*/

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

			return json;
		} catch (error) {
			throw error;
		}
	},

	/*	
		https://developer.bling.com.br/referencia#/Pedidos%20-%20Vendas/get_pedidos_vendas__idPedidoVenda_
	*/
	getPedidosVendasID: async (id: number) => {
		try {
			const url = `${process.env.BLING_URL}/pedidos/vendas/${id}`;

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
