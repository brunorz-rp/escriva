import { NextResponse } from "next/server";

export async function GET() {
	const url = new URL(`${process.env.BLING_API_URL}/oauth/authorize`);

	url.searchParams.append("response_type", "code");
	url.searchParams.append("client_id", process.env.BLING_CLIENT_ID!);
	url.searchParams.append("state", Math.ceil(Math.random() * 1e12).toString());

	return NextResponse.redirect(url.toString());
}
