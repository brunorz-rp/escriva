import { google } from "googleapis";
// import { GoogleAuth } from "google-auth-library";

async function updateValues(
	spreadsheetId: number,
	range: string,
	valueInputOption: string,
	_values: unknown
) {
	/*
	const auth = new GoogleAuth({
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});
     */

	const service = google.sheets({ version: "v4", auth });

	try {
		const result = await service.spreadsheets.values.update({
			spreadsheetId,
			range,
			valueInputOption,
			resource,
		});
		console.log("%d cells updated.", result.data.updatedCells);
		return result;
	} catch (err) {
		// TODO (Developer) - Handle exception
		throw err;
	}
}
