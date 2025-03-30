import { GoogleLogin } from "@react-oauth/google";

export default function Page() {
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
