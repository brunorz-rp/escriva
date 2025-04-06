export default async function TabelaDeProdutosPorCodigoPai({
	produtos,
}: {
	produtos: any[];
}) {
	return (
		<table className="text-gray-900 md:table">
			<thead className="rounded-lg text-left text-sm font-normal">
				<tr>
					<th scope="col" className="px-3 py-5 font-medium">
						#
					</th>
					<th scope="col" className="px-3 py-5 font-medium">
						Item
					</th>
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
				{produtos?.map((produto, index: number) => (
					<tr
						key={produto.codigoPai}
						className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
					>
						<td className="whitespace-nowrap px-3 py-3 font-extralight">
							{index + 1}
						</td>
						<td className="whitespace-nowrap px-3 py-3">{produto.codigoPai}</td>
						<td className="whitespace-nowrap px-3 py-3">
							{produto.cores.branco}
						</td>
						<td className="whitespace-nowrap px-3 py-3">
							{produto.cores.preto}
						</td>
						<td className="whitespace-nowrap px-3 py-3">
							{produto.cores.natural}
						</td>
						<td className="whitespace-nowrap px-3 py-3">
							{produto.amadeirado}
						</td>
						<td className="whitespace-nowrap px-3 py-3">
							{produto.cores.anodizado}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
