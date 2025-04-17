import { NextResponse } from "next/server";

export async function GET() {
	const authUrl = new URL(`${process.env.BLING_API_URL}/oauth/authorize`);

	authUrl.searchParams.append("response_type", "code");
	authUrl.searchParams.append("client_id", process.env.BLING_CLIENT_ID!);
	authUrl.searchParams.append(
		"state",
		Math.ceil(Math.random() * 1e12).toString()
	);

	return NextResponse.redirect(authUrl.toString());
}
