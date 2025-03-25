import { google } from "googleapis";

export async function authorize() {
	try {
		const auth = new google.auth.GoogleAuth({
			credentials: {
				client_email: process.env.GOOGLE_CLIENT_EMAIL,
				private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
			},
			scopes: ["https://www.googleapis.com/auth/spreadsheets"],
		});

		const sheets = google.sheets({
			auth,
			version: "v4",
		});

		const response = sheets.spreadsheets.values.update({
			spreadsheetId: "12SI-xjEhnP2nC8Ye-l2d3PeXy3zAu0ftiwKx4-AHjOg",
			range: "Teste!B3:D5",
			valueInputOption: "USER_ENTERED",
			requestBody: {
				values: [["LULU", "GIGANTE", "MACHADAO"]],
			},
		});
	} catch (error) {
		throw error;
	}
}
