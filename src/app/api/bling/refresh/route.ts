import { NextResponse } from "next/server";

// app/api/bling/refresh/route.ts
export async function POST(request: Request) {
	const { refresh_token } = await request.json();

	const response = await fetch("https://www.bling.com.br/Api/v3/oauth/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": `Basic ${Buffer.from(
				`${process.env.BLING_CLIENT_ID}:${process.env.BLING_CLIENT_SECRET}`
			).toString("base64")}`,
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token,
		}),
	});

	return NextResponse.json(await response.json());
}
