import { obterProdutos } from "@/app/services/bling/produtos/produtos";
import { ProdutosDadosBaseDTO } from "@/app/types/Bling/produto/ProdutosDadosBaseDTO";
import {
	converterProdutosDadosBaseDTO,
	Produto,
} from "@/app/types/Escriva/Produto";

export async function obterTodosOsProdutosAtivos() {
	let pagina = 1;
	const limite = 100;
	const criterio = 2; // 2 - Ativos
	const tipo = "V"; // V - Variação
	const idCategoria = 10845310; // ID da categoria "Perfil de Alumínio"

	let response = await obterProdutos({
		pagina,
		limite,
		criterio,
		tipo,
		idCategoria,
	});

	const produtosDoBling = [];

	produtosDoBling.push(response.data);

	while (response.data.length > 99) {
		pagina++;

		await new Promise(f => setTimeout(f, 2000));

		response = await obterProdutos({
			pagina,
			limite,
			criterio,
			tipo,
			idCategoria,
		});

		produtosDoBling.push(response.data);
	}

	const produtos: Array<Produto> = produtosDoBling.flat().map(
		(produto: ProdutosDadosBaseDTO) => converterProdutosDadosBaseDTO(produto)
	);

	return produtos;
}
