import { getProducts } from "@/app/lib/produtos";
import { Produto } from "@/app/types/Escriva/produto";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const codigo = searchParams.get("codigoPai") ?? undefined;
	//const cor = searchParams.get('cor');

	const productsFromDB: Produto[] = await getProducts(codigo);

	const json = JSON.stringify(productsFromDB);

	return new NextResponse(json, {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Content-Disposition": 'attachment; filename="relatorio-de-estoque.json"',
			"Cache-Control": "no-store",
		},
	});
}
