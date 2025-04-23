"use server";

import postgres from "postgres";
import { Tokens } from "../../types/Bling/authorization";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function updateTokens(tokens: Tokens) {
	try {
		const now = new Date();
		const expires_on = new Date(now.toUTCString());
		expires_on.setSeconds(expires_on.getSeconds() + tokens.expires_in);

		const result = await sql`
            UPDATE
                authorization
            SET
                access_token = ${tokens.access_token},
                expires_on = ${expires_on},
                token_type = ${tokens.token_type},
                scope = ${tokens.scope},
                refresh_token = ${tokens.refresh_token}
            WHERE
                id = 0
			RETURNING
				*
		`;

		return result;
	} catch (error) {
		throw error;
	}
}

export async function getAccessCode() {
	try {
		const tokensList = await sql<
			Tokens[]
		>`SELECT * FROM authorization WHERE token_id = 0`;

		const uniqueToken = tokensList[0];
		if (!uniqueToken) {
			throw Error("No tokens on database");
		}

		const tokens = uniqueToken;

		return tokens.access_token;
	} catch (error) {
		throw error;
	}
}

/*	
    https://developer.bling.com.br/aplicativos#fluxo-de-autorização
*/
export async function getAuthorizationTokens(code: string): Promise<Tokens> {
	try {
		const url = `${process.env.BLING_API_URL}/oauth/token`;

		const credentials = Buffer.from(
			`${process.env.BLING_CLIENT_ID}:${process.env.BLING_CLIENT_SECRET}`
		).toString("base64");

		const body = new URLSearchParams();
		body.append("grant_type", "authorization_code");
		body.append("code", code);
		body.append("redirect_uri", process.env.BLING_REDIRECT_URI!);

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": `Basic ${credentials}`,
			},
			body: body.toString(),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const json = await response.json();

		return json;
	} catch (error) {
		throw error;
	}
}
