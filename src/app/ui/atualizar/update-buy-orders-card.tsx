"use client";

import {
	ParametrosObterPedidosCompras,
	fetchBuyOrderWithItensFromBling,
	fetchBuyOrdersFromBling,
	upsertBuyOrders,
} from "@/app/lib/pedidos-de-compra";
import { PedidoDeCompra } from "@/app/types/Escriva/pedido-de-compra";
import { useState } from "react";
import LoadingDots from "./loading";

export default function UpdateBuyOrdersCard({
	isSomeoneUpdating,
	setSomeoneUpdating,
}: {
	isSomeoneUpdating: boolean;
	setSomeoneUpdating: (isUpdating: boolean) => void;
}) {
	const [itsMeUpdating, setMeUpdating] = useState(false);
	const [pagina, setPagina] = useState<number | undefined>(1);

	const parametros = {
		pagina: 1,
		limite: 100,
		idFornecedor: [16865141105, 16865110862, 17245617930],
		valorSituacao: [0, 3],
	};

	async function updateBuyOrders(parametros: ParametrosObterPedidosCompras) {
		setMeUpdating(true);
		setSomeoneUpdating(true);

		parametros.pagina = 1;

		const orders: PedidoDeCompra[] = [];
		const ordersWithItens: PedidoDeCompra[] = [];

		try {
			setPagina(parametros.pagina);
			let response = await fetchBuyOrdersFromBling(parametros);
			orders.push(...response);

			while (response.length > 99) {
				setPagina(parametros.pagina++);
				response = await fetchBuyOrdersFromBling(parametros);
				orders.push(...response);
			}

			for (const order of orders) {
				const orderWithItens = await fetchBuyOrderWithItensFromBling(order.id);
				ordersWithItens.push(orderWithItens);
			}

			setPagina(undefined);

			console.log(ordersWithItens)

			await upsertBuyOrders(ordersWithItens);
		} catch (error) {
			throw error;
		} finally {
			setSomeoneUpdating(false);
			setMeUpdating(false);
		}
	}

	return (
		<div className="w-full p-1 bg-blue-100 rounded-md items-center">
			<div className="flex items-center p-2">
				<span className="text-2xl font-medium flex-1 text-left center">
					Pedidos de Compra
				</span>
				<span className="mr-2 text-right">
					{itsMeUpdating ? (
						<span className="flex items-center">
							<LoadingDots />
						</span>
					) : (
						<>Última atualização em ...</>
					)}
				</span>
			</div>
			{!isSomeoneUpdating && (
				<div
					className="h-32 grid place-items-center hover:bg-blue-400 cursor-pointer rounded-md"
					onClick={() => {
						updateBuyOrders(parametros);
					}}
				>
					Atualizar 🔄
				</div>
			)}
			{itsMeUpdating && (
				<div className="h-32 grid place-items-center">
					{pagina ? (
						<p>Lendo página {pagina}...</p>
					) : (
						<p>{pagina} páginas lidas.</p>
					)}
				</div>
			)}
		</div>
	);
}
