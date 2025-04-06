export default async function TabelaDeCoresPorProduto({
	produtos,
}: {
	produtos: any[];
}) {
	return (
		<table className="text-gray-900 md:table">
			<thead className="rounded-lg text-left text-sm font-normal">
				<tr>
					<th scope="col" className="px-3 py-5 font-medium">
						Branco
					</th>
					<th scope="col" className="px-3 py-5 font-medium">
						Preto
					</th>
					<th scope="col" className="px-3 py-5 font-medium">
						Natural
					</th>
					<th scope="col" className="px-3 py-5 font-medium">
						Amadeirado
					</th>
					<th scope="col" className="px-3 py-5 font-medium">
						Anodizado
					</th>
				</tr>
			</thead>
			<tbody className="bg-white">
				{produtos?.map((produto) => (
					<tr
						key={produto.codigoPai}
						className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
					>
						<td className="whitespace-nowrap px-3 py-3">{produto.branco}</td>
						<td className="whitespace-nowrap px-3 py-3">{produto.preto}</td>
						<td className="whitespace-nowrap px-3 py-3">{produto.natural}</td>
						<td className="whitespace-nowrap px-3 py-3">
							{produto.amadeirado}
						</td>
						<td className="whitespace-nowrap px-3 py-3">{produto.anodizado}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
