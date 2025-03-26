import { signIn } from "@/auth";

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<form
				action={async () => {
					"use server";
					await signIn("google", { redirectTo: "/dashboard" });
				}}
			>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
				>
					Sign in with Google
				</button>
			</form>
		</div>
	);
}
