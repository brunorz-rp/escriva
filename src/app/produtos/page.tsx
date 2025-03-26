import FetchFromBling from "@/app/components/Buttons/fetch-from-bling";
import FetchFromDB from "@/app/components/Buttons/fetch-from-db";
import SaveToDB from "@/app/components/Buttons/save-to-db";

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
				<SaveToDB />
			</div>

			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<Search placeholder="Procurar produtos..." />
			</div>
			<TabelaDeProdutos filtro={filtro} />
			{/*
			<Suspense fallback={<InvoicesTableSkeleton />}>
				<Table query={query} currentPage={currentPage} />
			</Suspense>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} /> 
			</div>
			*/}
		</div>
	);
}
