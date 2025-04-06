import FetchFromBling from "@/app/components/Buttons/fetch-from-bling";
import FetchFromDB from "@/app/components/Buttons/fetch-from-db";

import Search from "../ui/search";
import { ProdutosEscriva } from "../lib/escriva/produtos";
import { agruparCoresPorCodigoPai } from "../lib/utils";
import TabelaDeProdutosPorCodigoPai from "../ui/produtos/tabela-de-produtos-por-codigo-pai";

export default async function Page(props: {
	searchParams?: Promise<{
		filtro?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const filtro = searchParams?.filtro || "";

	const produtos = await ProdutosEscriva.getProdutosFiltrados(filtro);
	const produtosAgrupadosPorCodigoPai = agruparCoresPorCodigoPai(produtos);

	/* const salvarTd = async () => {
		const produtosDoBling = await ProdutosBling.getProdutos(undefined);
		inserirProdutos(produtosDoBling);
	};*/

	return (
		<div className="w-full">
			<div>
				<h1 className="flex mb-4 text-xl md:text-2xl">Produtos</h1>
				<FetchFromBling />
				<FetchFromDB />
			</div>

			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<Search placeholder="Procurar produtos..." />
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<TabelaDeProdutosPorCodigoPai
					produtos={produtosAgrupadosPorCodigoPai}
				/>
				<TabelaDeProdutosPorCodigoPai
					produtos={produtosAgrupadosPorCodigoPai}
				/>
			</div>
		</div>
	);
}
