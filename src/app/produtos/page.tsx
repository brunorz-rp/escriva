import FetchFromBling from "@/app/components/Buttons/fetch-from-bling";
import FetchFromDB from "@/app/components/Buttons/fetch-from-db";

import Search from "../ui/search";
import TabelaDeProdutos from "../ui/produtos/tabela-de-produtos";

export default async function Page(props: {
	searchParams?: Promise<{
		filtro?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const filtro = searchParams?.filtro || "";

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
				<TabelaDeProdutos filtro={filtro} />
			</div>
		</div>
	);
}
