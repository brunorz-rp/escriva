import { VendasItemDTO } from "../Bling/pedido-de-venda";
import { PedidosComprasItemDTO } from "../Bling/pedidos-de-compra";
import { ProdutosDadosBaseDTO } from "../Bling/produto/ProdutosDadosBaseDTO";
import { ProdutoEntity } from "./database/produto-entity";

export type Produto = {
	id: number;
	idPai: number | null;
	codigo: string | null;
	codigoPai: string | null;
	cor: string | null;
	quantidade: number | null;
	precoCusto: number | null;
	precoVenda: number | null;
	nome: string | null;
};

export function converterProdutoEntity(entity: ProdutoEntity): Produto {
	const produto: Produto = {
		id: entity.id,
		idPai: entity.id_pai,
		codigo: entity.codigo,
		codigoPai: entity.codigo_pai,
		cor: entity.cor,
		precoCusto: entity.preco_custo,
		precoVenda: entity.preco_venda,
		quantidade: entity.estoque,
		nome: entity.nome,
	};

	return produto;
}

export function converterProdutosDadosBaseDTO(
	dto: ProdutosDadosBaseDTO
): Produto {
	const codigos = dto.codigo.split("-");
	const codigoCor = codigos.pop();
	const codigoPai = codigos.join("-");

	return {
		id: dto.id,
		idPai: dto.idProdutoPai ? dto.idProdutoPai : null,
		codigo: dto.codigo,
		codigoPai: codigoPai ? codigoPai : null,
		cor: codigoCor ? codigoCor : null,
		precoCusto: dto.precoCusto ? dto.precoCusto : null,
		precoVenda: null,
		quantidade: dto.estoque?.saldoVirtualTotal
			? dto.estoque?.saldoVirtualTotal
			: null,
		nome: dto.nome,
	};
}

export function converterProdutosDadosDTO(dto: ProdutosDadosBaseDTO): Produto {
	const codigos = dto.codigo.split("-");
	const codigoCor = codigos.pop();
	const codigoPai = codigos.join("-");

	return {
		id: dto.id,
		idPai: dto.idProdutoPai ? dto.idProdutoPai : null,
		codigo: dto.codigo,
		codigoPai: codigoPai ? codigoPai : null,
		cor: codigoCor ? codigoCor : null,
		precoCusto: dto.precoCusto ? dto.precoCusto : null,
		precoVenda: null,
		quantidade: dto.estoque?.saldoVirtualTotal
			? dto.estoque?.saldoVirtualTotal
			: null,
		nome: dto.nome,
	};
}

export function converterComprasItemDTO(dto: PedidosComprasItemDTO): Produto {
	const codigos = dto.produto.codigo?.split("-");
	const codigoCor = codigos?.pop();
	const codigoPai = codigos?.join("-");

	return {
		id: dto.produto.id,
		idPai: null,
		codigo: dto.produto.codigo ? dto.produto.codigo : null,
		codigoPai: codigoPai ? codigoPai : null,
		cor: codigoCor ? codigoCor : null,
		precoCusto: dto.valor,
		precoVenda: null,
		quantidade: dto.quantidade,
		nome: null,
	};
}

export function converterVendasItemDTO(dto: VendasItemDTO): Produto {
	const codigos = dto.codigo?.split("-");
	const codigoCor = codigos?.pop();
	const codigoPai = codigos?.join("-");

	return {
		id: dto.id,
		idPai: null,
		codigo: dto.codigo ? dto.codigo : null,
		codigoPai: codigoPai ? codigoPai : null,
		cor: codigoCor ? codigoCor : null,
		precoCusto: null,
		precoVenda: dto.valor,
		quantidade: dto.quantidade,
		nome: null,
	};
}
