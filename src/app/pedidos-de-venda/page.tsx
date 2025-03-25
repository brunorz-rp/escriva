import FetchFromBling from "@/app/components/Buttons/fetch-from-bling";
import FetchFromDB from "@/app/components/Buttons/fetch-from-db";
import SaveToDB from "@/app/components/Buttons/save-to-db";
import PedidoDeVendaCard from "@/app/components/Pedido-de-Venda/pedido-de-venda";
// import { listarUltimosDezPedidosDeVenda } from "@/lib/pedidos-de-venda";

import { fetchPedidosDeVenda } from "@/app/services/bling/pedidos/vendas";
import { PedidoDeVenda as PedidoBling } from "@/app/types/Bling/PedidoDeVenda";
import { PedidoDeVenda } from "@/app/types/Escriva/PedidoDeVenda";

export default async function Page() {
	//console.log(await listarUltimosDezPedidosDeVenda());

	const pedidosDeVenda = await getPedidosDeVenda();

	async function getPedidosDeVenda() {
		const response = await fetchPedidosDeVenda();

		const pedidosDeVenda: Array<PedidoDeVenda> = response.data.map(
			(pedido: PedidoBling) => ({
				id: pedido.id,
				numero: pedido.numero,
				data: pedido.data,
				contato: pedido.contato.id,
				situacao: pedido.situacao.valor,
			})
		);

		return pedidosDeVenda;
	}

	return (
		<div>
			<div>
				<h1 className="flex mb-4 text-xl md:text-2xl">Pedidos de Venda</h1>
				<FetchFromBling />
				<FetchFromDB />
				<SaveToDB />
			</div>

			<div className="rounded-xl">
				{pedidosDeVenda.map((pedidoDeVenda: PedidoDeVenda, index: number) => (
					<div key={index} className="p-1">
						<PedidoDeVendaCard pedido={pedidoDeVenda} />
					</div>
				))}
			</div>
		</div>
	);
}
