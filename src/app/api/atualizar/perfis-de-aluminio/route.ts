import { NextResponse } from "next/server";
import { fetchProductsFromBling } from "@/app/lib/produtos";
import { Produto } from "@/app/types/Escriva/produto";
// import {
// 	getBlingAuthCode,
// 	getBlingTokens,
// } from "@/app/api/atualizar/acessorios/route";

export async function GET() {
	try {
		const stream = new TransformStream();
		const writer = stream.writable.getWriter();
		const encoder = new TextEncoder();

		const sendData = async () => {
			try {
				await writer.write(
					encoder.encode(
						`data: ${JSON.stringify({ time: new Date().toISOString() })}\n\n`
					)
				);
			} catch (error) {
				clearInterval(intervalId);
				await writer.write(
					encoder.encode(
						`error: ${JSON.stringify({
							time: new Date().toISOString(),
						})}${error}\n\n`
					)
				);
				writer.close();
			}
		};

		const intervalId: NodeJS.Timeout = setInterval(sendData, 60000);

		const parametros = {
			pagina: 1,
			limite: 100,
			criterio: 2, // 2 - Ativos
			tipo: "V", // V - Variação
			idCategoria: 10845310, // ID da categoria "Perfil de Alumínio"
		};

		const produtos: Produto[] = [];

		let response = await fetchProductsFromBling(parametros);
		produtos.push(...response);
		sendData();

		while (response.length > 99) {
			response = await fetchProductsFromBling(parametros);
			produtos.push(...response);
			sendData();
		}

		//await upsertProducts(produtos);

		// Cleanup on client disconnect
		// const requestAborted = new Promise((resolve) => {
		// 	writer.closed.then(resolve).catch(resolve);
		// }).then(() => {
		// 	clearInterval(intervalId);
		// });

		return new Response(stream.readable, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				"Connection": "keep-alive",
			},
		});
	} catch (error) {
		return NextResponse.json({ error: `${error}` }, { status: 500 });
	}
}
