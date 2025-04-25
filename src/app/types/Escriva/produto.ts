import { VendasItemDTO } from "../Bling/pedido-de-venda";
import { PedidosComprasItemDTO } from "../Bling/pedidos-de-compra";
import { ProdutosDadosBaseDTO, ProdutosDadosDTO } from "../Bling/produtos";
import { ProdutoEntity } from "./database/produto";

export type Produto = {
	id: number;
	idPai?: number;
	codigo?: string;
	codigoPai?: string;
	cor?: string;
	quantidade?: number;
	peso?: number;
	precoCusto?: number;
	precoVenda?: number;
	nome?: string;
	idCategoria?: number;
};

export function converterProdutoEntity(entity: ProdutoEntity): Produto {
	const produto: Produto = {
		id: entity.id,
		idPai: entity.id_pai || undefined,
		codigo: entity.codigo || undefined,
		codigoPai: entity.codigo_pai || undefined,
		cor: entity.cor || undefined,
		peso: entity.peso || undefined,
		precoCusto: entity.preco_custo || undefined,
		precoVenda: entity.preco_venda || undefined,
		quantidade: entity.estoque || undefined,
		nome: entity.nome || undefined,
	};

	return produto;
}

export function converterProdutosDadosBaseDTO(
	dto: ProdutosDadosBaseDTO
): Produto {
	const codigos = dto.codigo?.split("-");
	const codigoCor = codigos?.pop();
	const codigoPai = codigos?.join("-");

	return {
		id: dto.id,
		idPai: dto.idProdutoPai,
		codigo: dto.codigo,
		codigoPai: codigoPai,
		cor: codigoCor,
		precoCusto: dto.precoCusto,
		precoVenda: dto.preco,
		quantidade: dto.estoque?.saldoVirtualTotal,
		nome: dto.nome,
	};
}

export function converterProdutosDadosDTO(dto: ProdutosDadosDTO): Produto {
	const codigos = dto.codigo?.split("-");
	const codigoCor = codigos?.pop();
	const codigoPai = codigos?.join("-");

	return {
		id: dto.id,
		codigo: dto.codigo,
		codigoPai: codigoPai,
		cor: codigoCor,
		peso: dto.pesoLiquido,
		precoVenda: dto.preco,
		quantidade: dto.estoque?.saldoVirtualTotal,
		nome: dto.nome,
	};
}

export function converterComprasItemDTO(dto: PedidosComprasItemDTO): Produto {
	const codigos = dto.produto.codigo?.split("-");
	const codigoCor = codigos?.pop();
	const codigoPai = codigos?.join("-");

	return {
		id: dto.produto.id,
		codigo: dto.produto.codigo,
		codigoPai: codigoPai,
		cor: codigoCor,
		precoCusto: dto.valor,
		quantidade: dto.quantidade,
	};
}

export function converterVendasItemDTO(dto: VendasItemDTO): Produto {
	const codigos = dto.codigo?.split("-");
	const codigoCor = codigos?.pop();
	const codigoPai = codigos?.join("-");

	return {
		id: dto.id,
		codigo: dto.codigo,
		codigoPai: codigoPai,
		cor: codigoCor,
		precoVenda: dto.valor,
		quantidade: dto.quantidade,
	};
}
