import FetchFromBling from "@/app/components/Buttons/fetch-from-bling";
import FetchFromDB from "@/app/components/Buttons/fetch-from-db";
import SaveToDB from "@/app/components/Buttons/save-to-db";
import PedidoDeVendaCard from "@/app/components/Pedido-de-Venda/pedido-de-venda";

import { fetchPedidosDeVenda } from "@/app/services/bling/pedidos/vendas";
import { PedidoDeVenda as PedidoBling } from "@/app/types/Bling/pedido-de-venda";
import { PedidoDeVenda } from "@/app/types/Escriva/pedido-de-venda";

export default async function Page() {
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
			<div className="flex">
				<div className="flex-1">
					<h1 className="flex mb-4 text-xl md:text-2xl">Pedidos de Venda</h1>
				</div>
				<div className="flex-1">
					<FetchFromBling />
					<FetchFromDB />
					<SaveToDB />
				</div>
			</div>
			<div>
				<div> Situações</div>
				<div>
					<div className="flex">
						<p>Em aberto</p>
						<input type="checkbox" name="emAberto" />
					</div>
					<div className="flex">
						<p>Atendido</p>
						<input type="checkbox" name="atendido" />
					</div>
					<div className="flex">
						<p>Atendido 2</p>
						<input type="checkbox" name="atendido2" />
					</div>
					<div className="flex">
						<p>Em andamento</p>
						<input type="checkbox" name="emAndamento" />
					</div>
					<div className="flex">
						<p>Em andamento 2</p>
						<input type="checkbox" name="emAndamento2" />
					</div>
					<div className="flex">
						<p>Reservado</p>
						<input id="reservado" type="checkbox" />
					</div>
				</div>
				<div>Data</div>
				{reservado}
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
