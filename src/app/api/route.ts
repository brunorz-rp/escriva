import { NextResponse } from "next/server";
import { getValidAccessCode } from "../lib/bling/authorization";

export async function GET() {
	console.log("API");
	try {
		const url = `${process.env.BLING_API_URL}/produtos`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${await getValidAccessCode()}`,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const json = await response.json();

		return NextResponse.json(json.data);
	} catch (error) {
		console.log(error);
		return NextResponse.json(error);
	}
}
