import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");
	const error = searchParams.get("error");

	try {
		if (error) {
			// return NextResponse.redirect(`/error?message=${encodeURIComponent(error)}`);
			return NextResponse.json(error);
		}

		if (!code) {
			return NextResponse.json({ error: "no code" });
		}

		// 1. Encode credentials
		const credentials = Buffer.from(
			`${process.env.BLING_CLIENT_ID}:${process.env.BLING_CLIENT_SECRET}`
		).toString("base64");

		// 2. Prepare form data
		const params = new URLSearchParams();
		params.append("grant_type", "authorization_code");
		params.append("code", code!);
		params.append("redirect_uri", process.env.BLING_REDIRECT_URI!);

		// 3. Make the request
		const response = await fetch(
			"https://www.bling.com.br/Api/v3/oauth/token",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Authorization": `Basic ${credentials}`,
				},
				body: params.toString(),
			}
		);

		// 4. Handle response
		if (!response.ok) {
			const errorData = await response.json();
			console.error("Bling API Error:", errorData);
			throw new Error(`Bling API Error: ${errorData.error || "Unknown error"}`);
		}

		const tokens = await response.json();

		return NextResponse.json({ tokens: tokens});		
	} catch (error) {
		console.error("Token exchange failed:", error);
		throw new Error("Failed to exchange authorization code for token");
	}
}
