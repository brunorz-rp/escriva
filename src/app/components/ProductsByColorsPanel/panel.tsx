"use client";

import { getProdutosFromEscriva } from "@/app/lib/escriva/produtos";
import { agruparVariacoesPorCor } from "@/app/lib/utils";
import { ProdutoPai } from "@/app/types/Escriva/produto-pai";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import TextFilter from "../Filters/filter";
import ProductsByColorsTable from "./table";
import ProductsByColorsWrapper from "./wrapper";

export default function ProductsByColorsPanel() {
	const [produtos, setProdutos] = useState<ProdutoPai[]>([]);

	async function refreshData(filter: string) {
		const newData = await getProdutosFromEscriva(filter);
		const groupedData = agruparVariacoesPorCor(newData);
		setProdutos(groupedData);
	}

	const handleChange = useDebouncedCallback((term: string) => {
		refreshData(term);
	}, 300);

	return (
		<div>
			<ProductsByColorsWrapper>
				<div>Produtos</div>
				<TextFilter
					placeholder={""}
					onFilterChange={(filter) => {
						handleChange(filter);
					}}
				/>

				<ProductsByColorsTable produtos={produtos} />
			</ProductsByColorsWrapper>
		</div>
	);
}
