import FetchFromBling from "@/app/components/Buttons/fetch-from-bling";
import FetchFromDB from "@/app/components/Buttons/fetch-from-db";
import SaveToDB from "@/app/components/Buttons/save-to-db";

import PedidoDeCompraCard from "@/app/components/Pedido-de-Compra/pedido-de-compra";

import { fetchPedidosDeCompra } from "@/app/services/bling/pedidos/compras";
// import { authorize } from "@/services/sheets/authorization";

import { PedidoDeCompra as PedidoBling } from "@/app/types/Bling/PedidoDeCompra";
import { PedidoDeCompra } from "@/app/types/Escriva/PedidoDeCompra";

export default async function Page() {
	const pedidosDeCompra = await getPedidosDeCompra();

	// authorize();	--	Escrever no google

	async function getPedidosDeCompra() {
		const response = await fetchPedidosDeCompra();

		const pedidosDeCompra: Array<PedidoDeCompra> = response.data.map(
			(pedido: PedidoBling) => ({
				id: pedido.id,
				numero: pedido.numero,
				data: pedido.data,
				fornecedor: pedido.fornecedor.id,
				situacao: pedido.situacao.valor,
			})
		);

		return pedidosDeCompra;
	}

	return (
		<div>
			<div>
				<h1 className="flex mb-4 text-xl md:text-2xl">Pedidos de Compra</h1>
				<FetchFromBling />
				<FetchFromDB />
				<SaveToDB />
			</div>

			<div className="rounded-xl">
				{pedidosDeCompra.map(
					(pedidoDeCompra: PedidoDeCompra, index: number) => (
						<div key={index} className="p-1">
							<PedidoDeCompraCard pedido={pedidoDeCompra} />
						</div>
					)
				)}
			</div>
		</div>
	);
}
