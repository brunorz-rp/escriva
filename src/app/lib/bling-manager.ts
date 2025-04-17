"use server";

import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

type Tokens = {
	access_token: string;
	refresh_token: string;
	created_on: Date;
};

export async function storeTokens(tokens: Tokens) {
	try {
		await sql`
            UPDATE
                bling_manager
            SET
                access_token = ${tokens.access_token},
                refresh_token = ${tokens.refresh_token},
                created_on = ${tokens.created_on}
            WHERE
                id = 12
            `;
	} catch (error) {
		throw error;
	}
}
