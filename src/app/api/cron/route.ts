import { NextResponse } from "next/server";

export async function GET() {
	console.log("CRON STARTED at", new Date().toISOString());

	try {
		await performTask();
		console.log("CRON COMPLETED successfully");
		return new NextResponse("OK");
	} catch (error) {
		console.error("CRON FAILED:", error);
		return new NextResponse("Error", { status: 500 });
	}
}

async function performTask() {
	console.log(`Task executed at ${new Date().toISOString()}`);
}
