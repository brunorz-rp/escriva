import { NextResponse } from "next/server";
import { getSellOrders } from "@/app/lib/pedidos-de-venda";
import { PedidoDeVenda } from "@/app/types/Escriva/pedido-de-venda";

export async function GET() {
	const orders: PedidoDeVenda[] = await getSellOrders();

	const json = JSON.stringify(orders);

	return new NextResponse(json, {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Content-Disposition": 'attachment; filename="relatorio-de-estoque.json"',
			"Cache-Control": "no-store",
		},
	});
}
