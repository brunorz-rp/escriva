// app/api/bling/callback/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");
	const error = searchParams.get("error");

	if (error) {
		return NextResponse.redirect(`/error?message=${encodeURIComponent(error)}`);
	}

	if (!code) {
		return NextResponse.redirect("/error?message=No authorization code");
	}

	try {
		const credentials: string = Buffer.from(
			`${process.env.BLING_CLIENT_ID}:${process.env.BLING_CLIENT_SECRET}`
		).toString("base64");

		const tokenResponse = await fetch(
			"https://www.bling.com.br/Api/v3/oauth/token",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Authorization": `Basic ${credentials}`,
				},
				body: JSON.stringify({
					grant_type: "authorization_code",
					code: code,
				}),
			}
		);

		const tokens = await tokenResponse.json();
		tokens.created_on = new Date();

		// Store tokens securely (e.g., database)
		await storeTokens(tokens);

		return NextResponse.json({ message: "sucesso" });
	} catch (err) {
		const error: string = err!.toString();
		return NextResponse.json({
			message: `/error?message=${encodeURIComponent(error)}`,
		});
	}
}

async function storeTokens(tokens: unknown) {
	// Implement your secure storage here
	console.log("Store these tokens securely:", tokens);
}

// https://script.google.com/home/projects/1r8U7soCkywsH_MXHkycKKuh_b2OwKrwA4nt48nY3t1y9fX-9MA_JAay_/edit
