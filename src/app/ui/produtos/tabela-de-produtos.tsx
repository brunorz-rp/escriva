import { buscarProdutosFiltrados } from "@/app/lib/produtos";
import { Produto } from "@/app/types/Escriva/Produto";

export default async function TabelaDeProdutos({ filtro }: { filtro: string }) {
	const produtos = await buscarProdutosFiltrados(filtro);

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
						Atualizado em
					</th>
				</tr>
			</thead>
			<tbody className="bg-white">
				{produtos?.map((produto: Produto, index: number) => (
					<tr
						key={produto.id}
						className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
					>
						<td className="whitespace-nowrap px-3 py-3">{index + 1}</td>
						<td className="whitespace-nowrap px-3 py-3">{produto.codigo}</td>
						<td className="whitespace-nowrap px-3 py-3">{produto.cor}</td>
						<td className="whitespace-nowrap px-3 py-3">{produto.estoque}</td>
						<td className="whitespace-nowrap px-3 py-3">
							{produto.atualizadoEm?.toString()}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
