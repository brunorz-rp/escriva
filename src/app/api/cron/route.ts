// app/api/cron/route.ts
import { NextResponse } from "next/server";

export async function GET() {
	// Your task logic here
	console.log("Running scheduled task...");
	await performTask();

	return NextResponse.json({ success: true });
}

async function performTask() {
	// Task implementation
	// Example: Fetch data, update DB, send emails, etc.
}
