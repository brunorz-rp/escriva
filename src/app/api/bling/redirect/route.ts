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
			return NextResponse.json(
				{ error: "Missing authorization code" },
				{ status: 400 }
			);
		}

		const payload = {
			grant_type: "authorization_code",
			code: code,
		};

		const tokens = await getAuthorizationTokens(payload);

		await updateTokens(tokens);

		return NextResponse.json({ message: "ok" });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
