"use client";

import { Produto } from "@/app/types/Escriva/produto";
import { useState } from "react";
import LoadingDots from "./loading";
import {
	ParametrosObterProdutos,
	fetchProductFromBling,
	fetchProductsFromBling,
	upsertProducts,
} from "@/app/lib/produtos";

export default function UpdateStockCard({
	isSomeoneUpdating,
	setSomeoneUpdating,
}: {
	isSomeoneUpdating: boolean;
	setSomeoneUpdating: (isUpdating: boolean) => void;
}) {
	const [itsMeUpdating, setMeUpdating] = useState(false);

	const [pagina, setPagina] = useState<number | undefined>(1);
	const [estoque] = useState<Produto[] | undefined>(undefined);

	const parametros = {
		pagina: 1,
		limite: 100,
		criterio: 2, // 2 - Ativos
		tipo: "V", // V - Variação
		idCategoria: 10845310, // ID da categoria "Perfil de Alumínio"
	};

	async function atualizarEstoque(parametros: ParametrosObterProdutos) {
		parametros.pagina = 1;

		setSomeoneUpdating(true);
		setMeUpdating(true);

		const produtos: Produto[] = [];

		try {
			setPagina(parametros.pagina);
			let response = await fetchProductsFromBling(parametros);
			produtos.push(...response);

			while (response.length > 99) {
				setPagina(parametros.pagina++);
				response = await fetchProductsFromBling(parametros);
				produtos.push(...response);
			}

			setPagina(undefined);

			for (const produto of produtos) {
				const produtoDetalhado = await fetchProductFromBling(produto.id);
				produto.peso = produtoDetalhado?.peso ?? null;
				produto.precoVenda = produtoDetalhado?.precoVenda ?? null;

				console.log("Produto montado:");
				console.log(produto);
			}

			await upsertProducts(produtos);
		} catch (error) {
			throw error;
		} finally {
			setSomeoneUpdating(false);
			setMeUpdating(false);
		}
	}

	return (
		<div className="w-full p-1 bg-blue-100 rounded-md items-center">
			<div className="flex items-center p-2">
				<span className="text-2xl font-medium flex-1 text-left center">
					Produtos detalhados em Estoque
				</span>
				<span className="mr-2 text-right">
					{itsMeUpdating ? (
						<span className="flex items-center">
							<LoadingDots />
						</span>
					) : (
						<>Última atualização em ...</>
					)}
				</span>
			</div>
			{!isSomeoneUpdating && (
				<div
					className="h-32 grid place-items-center hover:bg-blue-400 cursor-pointer rounded-md"
					onClick={() => {
						atualizarEstoque(parametros);
					}}
				>
					Atualizar 🔄
				</div>
			)}
			{itsMeUpdating && (
				<div className="h-32 grid place-items-center">
					{pagina ? (
						<p>Lendo página {pagina}...</p>
					) : (
						<p>{pagina} páginas lidas.</p>
					)}

					<div>{estoque && <p>{estoque.length} produtos em estoque.</p>}</div>
					<div>{estoque && <p>Salvando produtos...</p>}</div>
				</div>
			)}
		</div>
	);
}
