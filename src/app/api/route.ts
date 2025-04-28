import { NextResponse } from "next/server";

export async function GET() {
	console.log("API");
	try {
		return NextResponse.json({ mensagem: "sucesso" });
	} catch (error) {
		console.log(error);
		return NextResponse.json(error);
	}
}
