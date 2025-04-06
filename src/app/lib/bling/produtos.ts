import { Produto } from "@/app/types/Escriva/produto";

export type ParametrosObterProdutos = {
	pagina?: number;
	limite?: number;
	criterio?: number;
	tipo?: string;
	idComponente?: number;
	dataInclusaoInicial?: string;
	dataInclusaoFinal?: string;
	dataAlteracaoInicial?: string;
	dataAlteracaoFinal?: string;
	idCategoria?: number;
	idLoja?: string;
	nome?: string;
	idsProdutos?: number[];
	codigos?: number[];
};

const ProdutosBling = {
	getProdutos: async (
		parametros: ParametrosObterProdutos | undefined
	): Promise<Produto[]> => {
		parametros ??= {};
		parametros.pagina = 1;
		parametros.limite = 100;
		parametros.criterio = 2; // 2 - Ativos
		parametros.tipo = "V"; // V - Variação
		parametros.idCategoria = 10845310; // ID da categoria "Perfil de Alumínio"

		try {
			let response = await BlingAPI.getProdutos(parametros);

			const produtos = [];

			produtos.push(response.data);

			while (response.data.length > 99) {
				parametros.pagina++;

				await new Promise((f) => setTimeout(f, 2000));

				response = await BlingAPI.getProdutos(parametros);

				produtos.push(response.data);
			}

			return produtos.flat().map((produto: any) => ({
				id: produto.id,
				idPai: produto.idPai,
				codigo: produto.codigo,
				codigoPai: produto.codigo_pai,
				cor: produto.cor,
				quantidade: produto.estoque,
				precoCusto: produto.preco_custo,
				precoVenda: produto.preco_venda,
				nome: produto.nome,
				atualizadoEm: produto.atualizado_em,
			}));
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
};

const BlingAPI = {
	/*	
		https://developer.bling.com.br/referencia#/Produtos/get_produtos
	*/
	getProdutos: async (parametrosObterProdutos: ParametrosObterProdutos) => {
		try {
			const parametros = Object.entries(parametrosObterProdutos)
				.map(([key, value]) => `${key}=${value}`)
				.join("&");

			const url = `${process.env.BLING_URL}/produtos?${parametros}`;

			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${process.env.BLING_ACCESS_CODE}`,
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const json = await response.json();

			return json;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
};

export { ProdutosBling };
