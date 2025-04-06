import { PedidoDeVenda } from "@/app/types/Escriva/pedido-de-venda";

import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function obterPedidosDeVendaDoBanco() {
	try {
		const pedidos = await sql<PedidoDeVenda[]>`
		SELECT
		  *
		FROM
		  pedidos_de_venda
	  `;

		return pedidos;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch produtos.");
	}
}
