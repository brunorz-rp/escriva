import { NextResponse } from "next/server";
import { fetchProductsFromBling, upsertProducts } from "@/app/lib/produtos";
import { Produto } from "@/app/types/Escriva/produto";

export async function GET() {
	const parametros = {
		pagina: 1,
		limite: 100,
		criterio: 2, // 2 - Ativos
		tipo: "V", // V - Variação
		idCategoria: 10845310, // ID da categoria "Perfil de Alumínio"
	};

	try {
		const produtosDadosBaseDTO: Produto[] = [];

		let response = await fetchProductsFromBling(parametros);
		produtosDadosBaseDTO.push(...response);

		while (response.length > 99) {
			parametros.pagina++;
			response = await fetchProductsFromBling(parametros);
			produtosDadosBaseDTO.push(...response);
		}

		produtosDadosBaseDTO.forEach((produto) => {
			produto.idCategoria = parametros.idCategoria;
		});

		await upsertProducts(produtosDadosBaseDTO);

		return NextResponse.json({ mensagem: `Perfis de Alumínio atualizados.` });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: `${error}` });
	}
}
