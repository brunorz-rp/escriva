import { NextResponse } from "next/server";
import { fetchProductsCategoriesFromBling } from "@/app/lib/categorias";

export async function GET() {
	try {
		const categorias = await fetchProductsCategoriesFromBling();
		console.log(categorias)

		return NextResponse.json({ categorias: categorias });
	} catch (error) {
		console.log("ERROR thrown on /api/relatorio-de-categorias:");
		return NextResponse.json(error);
	}
}
