"use client";

import { signOut } from "@/auth";

export function Logout() {
	return (
		<button
			onClick={() => signOut({ redirectTo: "/login" })}
			className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
		>
			Sign Out
		</button>
	);
}
