"use client";

import { agruparVariacoesPorCor } from "@/app/lib/utils";
import { ProductRecords } from "@/app/types/Escriva/produto-pai";
import { getBuyOrders } from "@/app/lib/pedidos-de-compra";
import { useEffect } from "react";
import TextFilter from "./text-filter";

export default function BuyOrdersFilteredSearch({
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
			const filtered = await getBuyOrders(filter);

			const flattened = filtered.flatMap((order) => order.itens);

			const grouped = agruparVariacoesPorCor(flattened);

			setStock(grouped);
		};
		getFilteredOrders();
	}, [filter, setStock]);

	return (
		<div className="rounded-md bg-blue-100">
			<h1>Pedidos de Compra</h1>
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
