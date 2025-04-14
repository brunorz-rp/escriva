"use client";

import { useEffect, useState } from "react";
import { ProductRecords, ProdutoPai } from "@/app/types/Escriva/produto-pai";
import BuyOrdersFilteredSearch from "../Filters/buy-orders-fitered-search";
import ProductsFilteredSearch from "../Filters/products-fitered-search";
import SellOrdersFilteredSearch from "../Filters/sell-orders-fitered-search";
import ProductQuantityPerColorRow from "./column";

export default function Analyze() {
	const [stock, setStock] = useState<ProductRecords>({});
	const [stockFilter, setStockFilter] = useState<string>("");

	const [buyOrders, setBuyOrders] = useState<ProductRecords>({});
	const [buyOrdersFilter, setBuyOrdersFilter] = useState<string>("");

	const [sellOrders, setSellOrders] = useState<ProductRecords>({});
	const [sellOrdersFilter, setSellOrdersFilter] = useState<string>("");

	const [rows, setRows] = useState<ProdutoPai[][]>([]);

	useEffect(() => {
		const rows: ProdutoPai[][] = [];

		Object.entries(stock).forEach(([codigoPai, produto]) => {
			const row: ProdutoPai[] = [];

			const stockParentProduct: ProdutoPai = {
				codigo: codigoPai,
				branco: produto.branco,
				preto: produto.preto,
				natural: produto.natural,
				anodizado: produto.anodizado,
				amadeirado: produto.amadeirado,
			};

			row.push(stockParentProduct);

			const buyOrderParentProduct: ProdutoPai = {
				codigo: codigoPai,
				branco: buyOrders?.[codigoPai]?.branco,
				preto: buyOrders?.[codigoPai]?.preto,
				natural: buyOrders?.[codigoPai]?.natural,
				anodizado: buyOrders?.[codigoPai]?.anodizado,
				amadeirado: buyOrders?.[codigoPai]?.amadeirado,
			};

			row.push(buyOrderParentProduct);

			const sellOrderParentProduct: ProdutoPai = {
				codigo: codigoPai,
				branco: sellOrders?.[codigoPai]?.branco,
				preto: sellOrders?.[codigoPai]?.preto,
				natural: sellOrders?.[codigoPai]?.natural,
				anodizado: sellOrders?.[codigoPai]?.anodizado,
				amadeirado: sellOrders?.[codigoPai]?.amadeirado,
			};

			row.push(sellOrderParentProduct);

			rows.push(row);
		});

		// console.log(rows);
		setRows(rows);
	}, [stock, buyOrders, sellOrders]);

	return (
		<div className="flex m-3 text-center">
			<table className="border-separate bg-blue-50">
				<thead>
					<tr>
						<th className="bg-blue-950"></th>
						<th colSpan={4} className="bg-blue-50 p-1 rounded-t-lg">
							<ProductsFilteredSearch
								filter={stockFilter}
								setFilter={setStockFilter}
								setStock={setStock}
							/>
						</th>
						<th colSpan={3} className="bg-blue-50 p-1 rounded-t-lg">
							<BuyOrdersFilteredSearch
								filter={buyOrdersFilter}
								setFilter={setBuyOrdersFilter}
								setStock={setBuyOrders}
							/>
						</th>
						<th colSpan={3} className="bg-blue-50 p-1 rounded-t-lg">
							<SellOrdersFilteredSearch
								filter={sellOrdersFilter}
								setFilter={setSellOrdersFilter}
								setStock={setSellOrders}
							/>
						</th>
					</tr>
					<tr>
						<th className="bg-blue-200">#</th>
						<th className="bg-blue-100">Item</th>
						{rows[0]?.flatMap(() => (
							<>
								<th className="bg-blue-50">Branco</th>
								<th className="bg-blue-50">Preto</th>
								<th className="bg-blue-50">Natural</th>
							</>
						))}
					</tr>
				</thead>
				<tbody className="bg-blue-50 rounded-t-lg">
					{rows.map((row: ProdutoPai[], index: number) => (
						<tr className="bg-blue-50" key={index}>
							<td className="bg-blue-200 font-light">{index}</td>
							{row.map((produtoPai: ProdutoPai, index: number) => (
								<ProductQuantityPerColorRow
									key={index}
									anchor={index}
									produtoPai={produtoPai}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
