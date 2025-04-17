import { NextResponse } from "next/server";

export async function GET() {
	try {
		// Step 1: Get authorization code (server-side)
		const authCode = await getBlingAuthCode();

		console.log("authCode");
		console.log(authCode);

		// Step 2: Exchange code for tokens
		const tokens = await getBlingTokens(authCode);

		return NextResponse.json(tokens);
	} catch (error) {
		return NextResponse.json(
			{ error: "Authentication failed", details: error },
			{ status: 500 }
		);
	}
}

// Helper functions
async function getBlingAuthCode() {
	const randomState = Math.floor(Math.random() * 1e12).toString();

	const url = `${process.env.BLING_URL}/oauth/authorize?response_type=code&client_id=${process.env.BLING_CLIENT_ID}&state=${randomState}`;

	console.log("url");
	console.log(url);

	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	});

	console.log("response");
	console.log(response);

	if (!response.ok) throw new Error("Failed to get auth code");
	const data = await response.json();
	return data.code;
}

async function getBlingTokens(code: string) {
	const response = await fetch("https://www.bling.com.br/Api/v3/oauth/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": `Basic ${Buffer.from(
				`${process.env.BLING_CLIENT_ID}:${process.env.BLING_CLIENT_SECRET}`
			).toString("base64")}`,
		},
		body: new URLSearchParams({
			grant_type: "authorization_code",
			code,
			redirect_uri: process.env.BLING_REDIRECT_URI!,
		}),
	});

	if (!response.ok) throw new Error("Failed to get tokens");
	return await response.json();
}
