import { ProdutosDadosBaseDTO } from "../Bling/produto/ProdutosDadosBaseDTO";

export type Produto = {
	id: number;
	nome: string;
	cor: string | null;
	codigo: string | null;
	precoCusto: number | null;
	precoVenda: number | null;
	estoque: number | null;
	atualizadoEm?: Date;
};

export function converterProdutosDadosBaseDTO(
	dto: ProdutosDadosBaseDTO
): Produto {
	return {
		id: dto.id,
		nome: dto.nome,
		cor: (dto.nome.match(/Cor:([^\d]+)/i) || [])[1]?.trim(),
		codigo: dto.codigo ? dto.codigo : null,
		precoCusto: dto.precoCusto ? dto.precoCusto : null,
		precoVenda: null,
		estoque: dto.estoque?.saldoVirtualTotal
			? dto.estoque?.saldoVirtualTotal
			: null,
	};
}
