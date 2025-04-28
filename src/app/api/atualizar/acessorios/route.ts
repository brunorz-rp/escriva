import { NextResponse } from "next/server";
import { fetchProductsFromBling, upsertProducts } from "@/app/lib/produtos";
import { Produto } from "@/app/types/Escriva/produto";

export async function GET() {
	const parametros = {
		pagina: 1,
		limite: 100,
		criterio: 2, // 2 - Ativos
		idCategoria: 10764347, // ID da categoria "Acessórios"
	};

	const encoder = new TextEncoder();

	const stream = new ReadableStream({
		async start(controller) {
			const pushChunk = (chunk: string) => {
				controller.enqueue(encoder.encode(`${JSON.stringify(chunk)}\n`));
			};

			try {
				const produtosDadosBaseDTO: Produto[] = [];

				pushChunk(`Lendo página ${parametros.pagina}...`);
				let response = await fetchProductsFromBling(parametros);
				produtosDadosBaseDTO.push(...response);
				pushChunk(`${produtosDadosBaseDTO.length} produtos encontrados`);

				while (response.length > 99) {
					parametros.pagina++;
					pushChunk(`Lendo página ${parametros.pagina}...`);
					response = await fetchProductsFromBling(parametros);
					produtosDadosBaseDTO.push(...response);
					pushChunk(`${produtosDadosBaseDTO.length} produtos encontrados`);
				}

				pushChunk(
					`preparando ${produtosDadosBaseDTO.length} acessórios para upsert no banco de dados...`
				);

				produtosDadosBaseDTO
					.filter((produto: Produto) => produto.idPai === undefined)
					.forEach((produto) => {
						produto.idCategoria = parametros.idCategoria;
					});

				pushChunk(`realizando operação...`);

				await upsertProducts(produtosDadosBaseDTO);

				pushChunk(`acessórios atualizados.`);

				return NextResponse.json({ mensagem: `Acessórios atualizados.` });
			} catch (error) {
				pushChunk(String(error));
			} finally {
				controller.close();
			}
		},
	});

	return new NextResponse(stream, {
		headers: {
			"Content-Type": "application/x-ndjson",
			"Transfer-Encoding": "chunked",
		},
	});
}
