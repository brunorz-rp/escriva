import { GoogleLogin } from "@react-oauth/google";

export default function Page() {
	
	const googleLogin = useGoogleLogin({
		flow: "auth-code",
		onSuccess: async (codeResponse) => {
			console.log(codeResponse);
			const tokens = await axios.post("http://localhost:3001/auth/google", {
				code: codeResponse.code,
			});

			console.log(tokens);
		},
		onError: (errorResponse) => console.log(errorResponse),
	});

	return (
		<main>
			<GoogleLogin
				onSuccess={(credentialResponse) => {
					console.log(credentialResponse);
				}}
				onError={() => {
					console.log("Login Failed");
				}}
			/>
			;
		</main>
	);
}
