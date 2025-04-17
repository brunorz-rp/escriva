import { NextResponse } from "next/server";
import { fetchProductsFromBling } from "@/app/lib/produtos";
import { Produto } from "@/app/types/Escriva/produto";

export async function GET() {
	const stream = new TransformStream();
	// const writer = stream.writable.getWriter();
	// const encoder = new TextEncoder();

	const parametros = {
		pagina: 1,
		limite: 100,
		criterio: 2, // 2 - Ativos
		tipo: "V", // V - Variação
		idCategoria: 10845310, // ID da categoria "Perfil de Alumínio"
	};

	const produtos: Produto[] = [];

	(async () => {
		try {
			let response = await fetchProductsFromBling(parametros);
			produtos.push(...response);

			while (response.length > 99) {
				response = await fetchProductsFromBling(parametros);
				produtos.push(...response);
			}

			//await upsertProducts(produtos);
		} catch (error) {
			throw error;
		}
	})();

	return new NextResponse(stream.readable, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			"Connection": "keep-alive",
		},
	});
}

/*
// Example client-side usage

const eventSource = new EventSource('/api/stream');

eventSource.onmessage = (event) => {
  console.log('New data:', JSON.parse(event.data));
};

eventSource.onerror = () => {
  console.log('Connection closed');
  eventSource.close();
};
*/
