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
		console.log("tokens");
		console.log(tokens);

		await updateTokens(tokens);

		console.log("tokens updated");
		console.log(tokens);

		return NextResponse.json({ message: "Autorizado." });
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			message: "Failed to exchange authorization code for token",
			error: error,
		});
	}
}
