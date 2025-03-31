import { PedidosComprasDTO } from "@/app/types/Bling/pedidos-de-compra";
import {
	PedidoDeCompra,
	transformPedido,
} from "@/app/types/Escriva/pedido-de-compra";

import {
	obterPedidosDeCompra,
	ParametrosObterPedidosCompras,
} from "../bling/pedidos-de-compra";

import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function obterPedidosDeCompraDoBling() {
	const pedidosDoBling = [];

	const parametros: ParametrosObterPedidosCompras = {
		pagina: 1,
		limite: 100,
		idFornecedor: [16865141105, 16865110862, 17245617930],
		valorSituacao: [0, 3],
		//dataInicial,
		//dataFinal,
	};

	let response = await obterPedidosDeCompra(parametros);

	pedidosDoBling.push(response.data);

	while (response.data.length > 99) {
		parametros.pagina++;

		await new Promise((f) => setTimeout(f, 2000));

		response = await obterPedidosDeCompra(parametros);

		pedidosDoBling.push(response.data);
	}

	const pedidos: Array<PedidoDeCompra> = pedidosDoBling
		.flat()
		.map((pedido: PedidosComprasDTO) => transformPedido(pedido));

	return pedidos;
}

export async function obterPedidosDeCompraDoBanco() {
	try {
		const pedidos = await sql<PedidoDeCompra[]>`
		SELECT
		  *
		FROM
		  pedidos_de_compra
	  `;

		return pedidos;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch produtos.");
	}
}
