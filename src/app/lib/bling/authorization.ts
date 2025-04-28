"use server";

import postgres from "postgres";
import { Tokens } from "../../types/Bling/authorization";
import { TokensEntity } from "@/app/types/Escriva/authorization";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function updateTokens(tokens: Tokens) {
	try {
		const now = new Date();
		const expires_on = new Date(now.toUTCString());
		expires_on.setSeconds(expires_on.getSeconds() + tokens.expires_in);

		const result = await sql`
            UPDATE
                "authorization"
            SET
                access_token = ${tokens.access_token},
                expires_on = ${expires_on},
                token_type = ${tokens.token_type},
                scope = ${tokens.scope},
                refresh_token = ${tokens.refresh_token}
            WHERE
                token_id = 21042025
			RETURNING
				*
		`;

		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getValidAccessCode(): Promise<string> {
	try {
		const tokens = await getTokens();

		const now = new Date(new Date().toUTCString());

		const isAccessCodeValid = now < tokens.expires_on;

		if (!isAccessCodeValid) {
			const payload = {
				grant_type: "refresh_token",
				refresh_token: tokens.refresh_token,
			};

			const refreshedTokens = await getAuthorizationTokens(payload);

			await updateTokens(refreshedTokens);

			return refreshedTokens.access_token;
		}

		return tokens.access_token;
	} catch (error) {
		throw error;
	}
}

export async function getTokens(): Promise<TokensEntity> {
	try {
		const tokens = await sql<
			TokensEntity[]
		>`SELECT * FROM "authorization" WHERE token_id = 21042025`;

		if (tokens.length > 0) {
			return tokens[0];
		}

		throw Error("Couldn't find any token on database.");
	} catch (error) {
		throw error;
	}
}

/*	
    https://developer.bling.com.br/aplicativos#fluxo-de-autorização
*/
export async function getAuthorizationTokens(
	bodyMembers: Record<string, string>
): Promise<Tokens> {
	try {
		const url = `${process.env.BLING_API_URL}/oauth/token`;

		const credentials = Buffer.from(
			`${process.env.BLING_CLIENT_ID}:${process.env.BLING_CLIENT_SECRET}`
		).toString("base64");

		const body = new URLSearchParams();
		for (const [key, value] of Object.entries(bodyMembers)) {
			body.append(key, value);
		}
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
			console.log(response);
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const json = await response.json();

		return json;
	} catch (error) {
		throw error;
	}
}
