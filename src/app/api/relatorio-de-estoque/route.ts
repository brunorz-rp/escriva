import { getProducts } from "@/app/lib/produtos";
import { Produto } from "@/app/types/Escriva/produto";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const codigo = searchParams.get("codigoPai") ?? undefined;
	//const cor = searchParams.get('cor');

	const productsFromDB: Produto[] = await getProducts(codigo);

	const csvContent = productsFromDB
		.map((product) => `${product.codigo}, ${product.quantidade}`)
		.join("\n");

	return new NextResponse(csvContent, {
		headers: {
			"Content-Type": "text/csv",
			"Content-Disposition": 'attachment; filename="relatorio-de-saldo.csv"',
		},
	});
}
