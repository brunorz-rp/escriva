import { Produto } from "../types/Escriva/produto";
import { ProdutoPai } from "../types/Escriva/produto-pai";

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

export function agruparVariacoesPorCor(produtos: Produto[]): ProdutoPai[] {
	const variacoes: Record<string, Record<string, Produto>> = {};

	for (const produto of produtos) {
		if (produto.codigoPai && produto.cor) {
			const codigoPai: string = produto.codigoPai;
			const cor = interpretarCor(produto.cor);

			if (!variacoes[codigoPai]) {
				variacoes[codigoPai] = {};
			}

			variacoes[codigoPai][cor] = produto;
		}
	}

	const produtosPai: ProdutoPai[] = [];

	Object.entries(variacoes).forEach(([codigoPai, produto]) => {
		const produtoPai: ProdutoPai = {
			codigo: codigoPai,
			branco: produto.branco,
			preto: produto.preto,
			natural: produto.natural,
			amadeirado: produto.amadeirado,
			anodizado: produto.anodizado,
		};

		produtosPai.push(produtoPai);
	});

	return produtosPai;
}
