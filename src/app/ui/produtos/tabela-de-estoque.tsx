export default async function TabelaDeProdutos({
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
						Código
					</th>
					<th scope="col" className="px-3 py-5 font-medium">
						Cor
					</th>
					<th scope="col" className="px-3 py-5 font-medium">
						Quantidade
					</th>
					<th scope="col" className="px-3 py-5 font-medium">
						Preço de Custo
					</th>
					<th scope="col" className="px-3 py-5 font-medium">
						Preço de Venda
					</th>
					<th scope="col" className="px-3 py-5 font-medium">
						Atualizado em
					</th>
				</tr>
			</thead>
			<tbody className="bg-white">
				{produtos?.map((produto, index: number) => (
					<tr
						key={produto.id}
						className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
					>
						<td className="whitespace-nowrap px-3 py-3">{index + 1}</td>
						<td className="whitespace-nowrap px-3 py-3">{produto.codigo}</td>
						<td className="whitespace-nowrap px-3 py-3">{produto.cor}</td>
						<td className="whitespace-nowrap px-3 py-3">{produto.estoque}</td>
						<td className="whitespace-nowrap px-3 py-3">
							{formatarParaMoeda(produto.precoCusto)}
						</td>
						<td className="whitespace-nowrap px-3 py-3">
							{formatarParaMoeda(produto.precoVenda)}
						</td>
						<td className="whitespace-nowrap px-3 py-3">
							{formatarDateParaString(produto.atualizadoEm)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
