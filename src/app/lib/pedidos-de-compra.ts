import postgres from "postgres";

import { PedidoDeCompra } from "@/app/types/Escriva/pedido-de-compra";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function listarUltimosDezPedidosDeCompra() {
	try {
		const data = await sql<PedidoDeCompra[]>`
            SELECT *
            FROM pedidos_de_compra
            ORDER BY pedidos_de_compra.id ASC
            LIMIT 10`;

		return data;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error();
	}
}
