"use client";

import { getRecordsOfVariacoesPorCor } from "@/app/lib/utils";
import { ProductRecords } from "@/app/types/Escriva/produto-pai";
import { getSellOrders } from "@/app/lib/pedidos-de-venda";
import { useEffect } from "react";
import TextFilter from "./text-filter";

export default function SellOrdersFilteredSearch({
	filter,
	setFilter,
	setStock,
}: {
	filter: string;
	setFilter: (value: string) => void;
	setStock: (value: ProductRecords) => void;
}) {
	useEffect(() => {
		const getFilteredOrders = async () => {
			const filtered = await getSellOrders(filter);

			const flattened = filtered.flatMap((order) => order.itens);

			const grouped = getRecordsOfVariacoesPorCor(flattened);

			setStock(grouped);
		};
		getFilteredOrders();
	}, [filter, setStock]);

	return (
		<div className=" bg-blue-100">
			<h1>Pedidos de Venda</h1>
			<div>
				<TextFilter
					placeholder={"pesquisar por nome ou código"}
					onFilterChange={(filter) => {
						setFilter(filter);
					}}
				/>
			</div>
		</div>
	);
}
