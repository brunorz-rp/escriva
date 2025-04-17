import { NextResponse } from "next/server";

export async function GET() {
	const authUrl = new URL("https://www.bling.com.br/Api/v3/oauth/authorize");

	authUrl.searchParams.append("response_type", "code");
	authUrl.searchParams.append("client_id", process.env.BLING_CLIENT_ID!);
	authUrl.searchParams.append(
		"state",
		Math.floor(Math.random() * 1e12).toString()
	);

	//authUrl.searchParams.append("redirect_uri", process.env.BLING_REDIRECT_URI!);

	// Add required scopes (comma-separated)
	//authUrl.searchParams.append("scope", "produtos.read,pedidos.write");

	console.log("tentando");
	console.log(authUrl);

	return NextResponse.redirect(authUrl.toString());
}
