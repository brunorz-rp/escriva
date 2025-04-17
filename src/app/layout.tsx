import "@/app/global.css";

import { inter } from "@/app/fonts";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	return (
		<html lang="en">
			<body className={`${inter.className} antialiased bg-blue-950`}>
				<SessionProvider session={session}>{children}</SessionProvider>
			</body>
		</html>
	);
}
