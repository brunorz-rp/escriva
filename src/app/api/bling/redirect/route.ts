import {
	getAuthorizationTokens,
	updateTokens,
} from "@/app/lib/bling/authorization";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const code = searchParams.get("code");

		if (!code) {
			// return NextResponse.redirect(`/error?message=${encodeURIComponent(error)}`);
			return NextResponse.json({ error: "no code" });
		}

		const tokens = await getAuthorizationTokens(code);

		const updatedTokens = await updateTokens(tokens);

		console.log("tokens updated");
		console.log(updatedTokens);

		return NextResponse.json({ tokens: updatedTokens });
	} catch (error) {
		return NextResponse.json({ error: error });
	}
}
