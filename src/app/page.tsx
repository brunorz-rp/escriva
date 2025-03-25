import AcmeLogo from "@/app/ui/acme-logo";
import { auth, signIn, signOut } from "../auth";

export default async function Page() {
	let session = await auth();
	let user = session?.user?.email;

	function SignIn() {
		return (
			<form
				action={async () => {
					"use server";
					await signIn("google");
				}}
			>
				<p>You are not logged in</p>
				<button type="submit">Sign in with Google</button>
			</form>
		);
	}

	function SignOut({ children }: { children: React.ReactNode }) {
		return (
			<form
				action={async () => {
					"use server";
					await signOut();
				}}
			>
				<p>{children}</p>
				<button type="submit">Sign out</button>
			</form>
		);
	}

	return (
		<main className="flex min-h-screen flex-col p-6">
			<div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
				{<AcmeLogo />}
			</div>
			<div className="mt-4 flex grow flex-col gap-4 md:flex-row">
				<div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
					<p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
						{user ? <SignOut>{`Welcome ${user}`}</SignOut> : <SignIn />}
					</p>
				</div>
			</div>
		</main>
	);
}
