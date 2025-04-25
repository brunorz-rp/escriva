"use server";

import { getValidAccessCode } from "./bling/authorization";

/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*
 *	V		Métodos que interagem com o Bling	V		*
 *	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

export async function fetchDepositosFromBling() {
	try {
		const depositos = await BlingAPI.getDepositos();
		console.log(depositos);

		return depositos;
	} catch (error) {
		throw error;
	} finally {
		await new Promise((resolve) => setTimeout(resolve, 2000));
	}
}

const BlingAPI = {
	/*	
		https://developer.bling.com.br/referencia#/Dep%C3%B3sitos/get_depositos
	*/
	getDepositos: async () => {
		try {
			const accessCode: string = await getValidAccessCode();

			const url = `${process.env.BLING_API_URL}/depositos`;

			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${accessCode}`,
				},
			});

			if (!response.ok) {
				console.log(response);
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const json = await response.json();

			return json.data;
		} catch (error) {
			console.log("ERROR thrown on getDepositos:");
			console.log(error);
			throw error;
		}
	},
};
