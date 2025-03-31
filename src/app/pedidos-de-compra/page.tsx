import FetchFromBling from "@/app/components/Buttons/fetch-from-bling";
import FetchFromDB from "@/app/components/Buttons/fetch-from-db";

import PedidoDeCompraCard from "@/app/components/Pedido-de-Compra/pedido-de-compra";

import { PedidoDeCompra } from "@/app/types/Escriva/pedido-de-compra";
import { obterPedidosDeCompraDoBanco } from "../lib/escriva/pedidos-de-compra";

export default async function Page() {
	const pedidosDeCompra = await obterPedidosDeCompraDoBanco();

	return (
		<div>
			<div>
				<h1 className="flex mb-4 text-xl md:text-2xl">Pedidos de Compra</h1>
				<FetchFromBling />
				<FetchFromDB />
			</div>

			<div className="rounded-xl">
				{pedidosDeCompra?.map(
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
