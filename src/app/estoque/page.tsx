import FetchFromBling from "@/components/Buttons/fetch-from-bling";
import FetchFromDB from "@/components/Buttons/fetch-from-db";
import SaveToDB from "@/components/Buttons/save-to-db";
import { inserirProduto } from "@/lib/estoque";

import { obterTodosOsProdutosAtivos } from "@/services/escriva/produtos/produtos";
import { Produto } from "@/types/Escriva/Produto";

export default async function Page() {
	const produtosDoBling: Array<Produto> = await obterTodosOsProdutosAtivos();

	produtosDoBling.forEach((produto) => {
		inserirProduto(produto);
	});

	return (
		<div>
			<div>
				<h1 className="flex mb-4 text-xl md:text-2xl">Pedidos de Compra</h1>
				<FetchFromBling />
				<FetchFromDB />
				<SaveToDB />
			</div>

			<div className="rounded-xl">
				{produtosDoBling.map((produto: Produto, index: number) => (
					<div key={index} className="p-1"></div>
				))}
			</div>
		</div>
	);
}
