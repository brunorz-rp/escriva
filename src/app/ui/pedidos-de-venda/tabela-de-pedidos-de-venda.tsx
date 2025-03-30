import { PedidoDeVenda } from "@/app/types/Escriva/pedido-de-venda";

export default async function TabelaDePedidosDeVenda({
	pedidos,
}: {
	pedidos: Array<PedidoDeVenda>;
}) {
	return (
		<table className="text-gray-900 md:table">
			<thead className="rounded-lg text-left text-sm font-normal">
				<tr>
					<th scope="col" className="px-3 py-5 font-medium">
						#
					</th>
					<th scope="col" className="px-3 py-5 font-medium">
						N°
					</th>
					<th scope="col" className="px-3 py-5 font-medium">
						Situação
					</th>
					<th scope="col" className="px-3 py-5 font-medium">
						Comprador
					</th>
					<th scope="col" className="px-3 py-5 font-medium">
						Data
					</th>
				</tr>
			</thead>
			<tbody className="bg-white">
				{pedidos?.map((pedido: PedidoDeVenda, index: number) => (
					<tr
						key={pedido.id}
						className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
					>
						<td className="whitespace-nowrap px-3 py-3">{index + 1}</td>
						<td className="whitespace-nowrap px-3 py-3">{pedido.numero}</td>
						<td className="whitespace-nowrap px-3 py-3">{pedido.situacao}</td>
						<td className="whitespace-nowrap px-3 py-3">{pedido.comprador}</td>
						<td className="whitespace-nowrap px-3 py-3">
							{pedido.data.toString()}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
