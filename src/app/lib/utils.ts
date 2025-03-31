export const formatarParaMoeda = (amount: number | null) => {
	return amount
		? amount.toLocaleString("pt-BR", {
				style: "currency",
				currency: "BRL",
		  })
		: null;
};

export const formatarDateParaString = (data: Date, local: string = "pt-BR") => {
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "short",
	};
	const formatter = new Intl.DateTimeFormat(local, options);
	return formatter.format(data);
};
