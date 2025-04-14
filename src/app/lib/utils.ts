import { ProductRecords } from "@/app/types/Escriva/produto-pai";
import { Produto } from "../types/Escriva/produto";

export const interpretarCor = (cor: string) => {
	switch (cor) {
		case "BCO":
			return "branco";
		case "PTO":
			return "preto";
		case "NAT":
			return "natural";
		case "AMA":
			return "amadeirado";
		case "AND":
			return "anodizado";
		default:
			return "?";
	}
};

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

export function agruparVariacoesPorCor(produtos: Produto[]): ProductRecords {
	const variacoes: Record<string, Record<string, Produto>> = {};

	for (const produto of produtos) {
		if (produto.codigoPai && produto.cor) {
			const codigoPai: string = produto.codigoPai;
			const cor = interpretarCor(produto.cor);

			if (!variacoes[codigoPai]) {
				variacoes[codigoPai] = {};
				variacoes[codigoPai][cor] = produto;
			} else {
				if (variacoes[codigoPai][cor].quantidade && produto.quantidade) {
					variacoes[codigoPai][cor].quantidade += produto.quantidade;
				}
			}
		}
	}

	return variacoes;
}
