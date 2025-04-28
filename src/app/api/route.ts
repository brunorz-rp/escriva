import { getTokens, getValidAccessCode } from "@/app/lib/bling/authorization";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		try {
			console.log("Avaliando acesso ao banco de dados...");
			const tokens = await getTokens();

			if (tokens) {
				console.log("OK.");
			}
		} catch (error) {
			console.log("Erro:");
			console.log(error);
		}

		try {
			console.log("Avaliando token de acesso ao Bling...");
			const validAccessCode = await getValidAccessCode();

			if (validAccessCode) {
				console.log("OK.");
			}
		} catch (error) {
			console.log("Erro:");
			console.log(error);
		}

		return NextResponse.json({ mensagem: "Avaliação concluída." });
	} catch (error) {
		return NextResponse.json(error);
	}
}
