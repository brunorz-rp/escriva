"use client";

import { agruparVariacoesPorCor } from "@/app/lib/utils";
import { ProductRecords } from "@/app/types/Escriva/produto-pai";
import { getProducts } from "@/app/lib/escriva/produtos";
import { useEffect } from "react";
import TextFilter from "./text-filter";

export default function ProductsFilteredSearch({
	filter,
	setFilter,
	setStock,
}: {
	filter: string;
	setFilter: (value: string) => void;
	setStock: (value: ProductRecords) => void;
}) {
	useEffect(() => {
		const getFilteredProducts = async () => {
			const filtered = await getProducts(filter);
			const grouped = agruparVariacoesPorCor(filtered);
			setStock(grouped);
		};
		getFilteredProducts();
	}, [filter, setStock]);

	return (
		<div className="bg-blue-100">
			<h1>Lista de Itens</h1>

			<TextFilter
				placeholder={""}
				onFilterChange={(filter) => {
					setFilter(filter);
				}}
			/>
		</div>
	);
}
