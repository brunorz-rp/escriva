"use client";

import { getProdutosFromEscriva } from "@/app/lib/escriva/produtos";
import { agruparVariacoesPorCor } from "@/app/lib/utils";
import { ProdutoPai } from "@/app/types/Escriva/produto-pai";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import TextFilter from "../Filters/filter";
import SellOrdersByColorsTable from "./table";
import SellOrdersByColorsWrapper from "./wrapper";

export default function SellOrdersByColorsPanel() {
	const [pedidos, setPedidos] = useState<ProdutoPai[]>([]);

	async function refreshData(filter: string) {
		const newData = await getProdutosFromEscriva(filter);
		const groupedData = agruparVariacoesPorCor(newData);
		setPedidos(groupedData);
	}

	const handleChange = useDebouncedCallback((term: string) => {
		refreshData(term);
	}, 300);

	return (
		<div>
			<SellOrdersByColorsWrapper>
				<div>Produtos</div>
				<TextFilter
					placeholder={""}
					onFilterChange={(filter) => {
						console.log(filter);
						handleChange(filter);
					}}
				/>

				<SellOrdersByColorsTable produtos={pedidos} />
			</SellOrdersByColorsWrapper>
		</div>
	);
}
