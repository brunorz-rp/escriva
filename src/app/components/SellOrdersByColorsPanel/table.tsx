import { ProdutoPai } from "@/app/types/Escriva/produto-pai";

export default function SellOrdersByColorsTable({
	produtos,
}: {
	produtos: ProdutoPai[];
}) {
	// Pedidos de Venda
	/*
	const pedidosDeVendaDoBling: PedidoDeVenda[] =
	await BlingPedidosDeVenda.getPedidosComItens({
		idsSituacoes: [452950, 452952],
	});
	
	const itensDosPedidosDeVendaDoBling = pedidosDeVendaDoBling.map(
		(pedido) => pedido.itens
	);
	
	console.log("itensDosPedidosDeVendaDoBling:");
	console.log(itensDosPedidosDeVendaDoBling.flat());
	
	const produtosVendidosPorCodigoPai = agruparCoresPorCodigoPai(
		itensDosPedidosDeVendaDoBling.flat()
	);
	*/

	//const fileira: QuantidadePorCoresDoProduto[] = [];

	//fileira.push(produtosAgrupadosPorCodigoPai);

	return (
		<table className="text-gray-900 md:table">
			<thead className="rounded-lg text-center text-sm font-normal">
				<tr>
					<th scope="col" className="font-medium">
						#
					</th>
					<th scope="col" className="font-medium">
						Item
					</th>
					<th scope="col" className="font-medium">
						Branco
					</th>
					<th scope="col" className="font-medium">
						Preto
					</th>
					<th scope="col" className="font-medium">
						Natural
					</th>
					<th scope="col" className="font-medium">
						Amadeirado
					</th>
					<th scope="col" className="font-medium">
						Anodizado
					</th>
				</tr>
			</thead>
			<tbody className="rounded-lg text-left text-sm font-normal">
				{produtos?.map((produtoPai: ProdutoPai, index: number) => (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>{produtoPai.codigo}</td>
						<td>{produtoPai.branco?.quantidade}</td>
						<td>{produtoPai.preto?.quantidade}</td>
						<td>{produtoPai.natural?.quantidade}</td>
						<td>{produtoPai.amadeirado?.quantidade}</td>
						<td>{produtoPai.anodizado?.quantidade}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
