// app/api/hello-csv/route.ts
import { NextResponse } from "next/server";

export async function GET() {
	// Generate 10 random numbers
	const numbers = Array.from(
		{ length: 10 },
		() => Math.floor(Math.random() * 100) + 1
	);

	// Convert to CSV format
	const csvContent = "Random Numbers\n" + numbers.join("\n");

	// Return as CSV with proper headers
	return new NextResponse(csvContent, {
		headers: {
			"Content-Type": "text/csv",
			"Content-Disposition": 'attachment; filename="random-numbers.csv"',
		},
	});
}
