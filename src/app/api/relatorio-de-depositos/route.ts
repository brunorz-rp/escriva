import { NextResponse } from "next/server";
import { fetchDepositosFromBling } from "@/app/lib/depositos";

export async function GET() {
	try {
		const categorias = await fetchDepositosFromBling();
		console.log(categorias);

		return NextResponse.json({ categorias: categorias });
	} catch (error) {
		console.log("ERROR thrown on /api/relatorio-de-depositos:");
		return NextResponse.json(error);
	}
}
