import { NextResponse } from "next/server";
import { getBuyOrders } from "@/app/lib/pedidos-de-compra";
import { PedidoDeCompra } from "@/app/types/Escriva/pedido-de-compra";

export async function GET() {
	const orders: PedidoDeCompra[] = await getBuyOrders();

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
