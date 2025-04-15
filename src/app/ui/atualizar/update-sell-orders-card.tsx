"use client";

import {
	ParametrosObterPedidosVendas,
	fetchSellOrdersFromBling,
	fetchSellOrderWithItensFromBling,
	upsertSellOrders,
} from "@/app/lib/pedidos-de-venda";
import { PedidoDeVenda } from "@/app/types/Escriva/pedido-de-venda";
import { useState } from "react";
import LoadingDots from "./loading";

export default function UpdateSellOrdersCard({
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
		// idsSituacoes: [6, 452950, 452952],
	};

	async function updateSellOrders(parametros: ParametrosObterPedidosVendas) {
		setMeUpdating(true);
		setSomeoneUpdating(true);

		parametros.pagina = 1;

		const orders: PedidoDeVenda[] = [];
		const ordersWithItens: PedidoDeVenda[] = [];

		try {
			setPagina(parametros.pagina);
			let response = await fetchSellOrdersFromBling(parametros);
			orders.push(...response);

			while (response.length > 99) {
				setPagina(parametros.pagina++);
				response = await fetchSellOrdersFromBling(parametros);
				orders.push(...response);
			}

			setPagina(undefined);

			for (const order of orders) {
				const orderWithItens = await fetchSellOrderWithItensFromBling(order.id);
				ordersWithItens.push(orderWithItens);
			}

			await upsertSellOrders(ordersWithItens);
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
					Pedidos de Venda
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
						updateSellOrders(parametros);
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
