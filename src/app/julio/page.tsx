"use client";

import { useState } from "react";
import { getProducts } from "../lib/produtos";
import { Produto } from "../types/Escriva/produto";

interface ComparacaoProduto extends Produto {
	pesoLiquidoNovo: number;
	precoNovo: number;
}

export default function Julio() {
	const [csvData, setCsvData] = useState<Record<string, number>>({});
	const [products, setProducts] = useState<ComparacaoProduto[]>([]);

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (event) => {
			parseCSV(event?.target?.result);
		};
		reader.readAsText(file);
	};

	const parseCSV = (text: string | ArrayBuffer | null | undefined) => {
		const info: Record<string, number> = {};

		const lines = typeof text === "string" ? text.split(/\r?\n/) : [];

		lines.slice(1).forEach((line: string) => {
			const values = line.split(',"');

			if (values.length === 4) {
				const codigoPai = values.shift();
				const peso = values.pop();

				if (codigoPai && peso) {
					const pesoLiquido = parseFloat(
						peso.replaceAll('Kg"', "").replace(",", ".").trim()
					);
					info[codigoPai] = pesoLiquido;
				}
			}
		});
		console.log(info);
		setCsvData(info);
	};

	const salvarTudo = async () => {
		for (const produto of products) {
			console.log(
				`Enviar ${produto.codigo} com peso ${produto.pesoLiquidoNovo} e preço ${produto.precoNovo}`
			);
		}
	};

	const atualizar = async () => {
		const estoque = await getProducts();

		const estoqueFiltrado = estoque.filter(
			(produto) =>
				produto.cor === "ANO" || produto.cor === "AND" || produto.cor === "AMA"
		);

		const produtosNoBling: ComparacaoProduto[] = [];

		for (const produto of estoqueFiltrado) {
			const produtoNoBling = produto as ComparacaoProduto;

			if (csvData) {
				const codigos = produtoNoBling.codigo?.split("-");
				const codigoCor = codigos?.pop();
				const codigoPai = codigos?.join("-");

				if (!codigoPai || !codigoCor) {
					console.log("Erro no produto:");
					console.log("Produto no Banco:");
					console.log(produto);
					console.log("Produto no Bling:");
					console.log(produtoNoBling);
				} else {
					const pesoNaPlanilha: number = csvData[codigoPai];

					produtoNoBling.pesoLiquidoNovo = pesoNaPlanilha;

					const isSL = /^SL/.test(codigoPai);
					const isVZ080 = /^VZ-080/.test(codigoPai);

					let precoPorKilo: number = 999;

					if (isSL) {
						if (codigoCor === "ANO" || codigoCor === "AND") {
							precoPorKilo = 49.28;
						} else if (codigoCor === "AMA") {
							precoPorKilo = 65;
						}
					} else if (isVZ080) {
						if (codigoCor === "ANO" || codigoCor === "AND") {
							precoPorKilo = 49.26;
						} else if (codigoCor === "AMA") {
							precoPorKilo = 65;
						}
					} else {
						if (codigoCor === "ANO" || codigoCor === "AND") {
							precoPorKilo = 47.57;
						} else if (codigoCor === "AMA") {
							precoPorKilo = 65;
						}
					}
					produtoNoBling.precoNovo =
						precoPorKilo * produtoNoBling.pesoLiquidoNovo;
					produtoNoBling.precoNovo = parseFloat(
						produtoNoBling.precoNovo.toFixed(2)
					);
				}
			}

			produtosNoBling.push(produtoNoBling);
		}

		setProducts(produtosNoBling);
	};

	return (
		<div className="m-3 bg-blue-50 place-items-center text-center">
			<div className="flex">
				<input type="file" accept=".csv" onChange={handleFileUpload} />
				<button onClick={atualizar}>Atualizar</button>
				<button onClick={salvarTudo}>Salvar</button>
			</div>
			<table className="divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th>Item</th>
						<th>Peso Antigo</th>
						<th>Peso Novo</th>
						<th>Preço Antigo</th>
						<th>Preço Novo</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{products.map((p: ComparacaoProduto, index: number) => (
						<tr key={index}>
							<td className="py-4 whitespace-nowrap">{p.codigo}</td>
							<td className="py-4">{p.peso}</td>
							<td className="py-4">{p.pesoLiquidoNovo}</td>
							<td className="py-4">{p.precoVenda}</td>
							<td className="py-4">{p.precoNovo}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
