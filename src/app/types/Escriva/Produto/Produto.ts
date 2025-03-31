import { ProdutosDadosBaseDTO } from "../../Bling/produto/ProdutosDadosBaseDTO";

export type Produto = {
	id: number;
	codigoPai: string | null;
	codigo: string;
	cor: string | null;
	estoque: number | null;
	precoCusto: number | null;
	precoVenda: number | null;
	nome: string;
	atualizadoEm: Date;
};

export function converterProdutosDadosBaseDTO(
	dto: ProdutosDadosBaseDTO
): Produto {
	return {
		id: dto.id,
		codigoPai: null,
		codigo: dto.codigo,
		nome: dto.nome,
		cor: (dto.nome.match(/Cor:([^\d]+)/i) || [])[1]?.trim(),
		precoCusto: dto.precoCusto ? dto.precoCusto : null,
		precoVenda: null,
		estoque: dto.estoque?.saldoVirtualTotal
			? dto.estoque?.saldoVirtualTotal
			: null,
		atualizadoEm: new Date(),
	};
}
