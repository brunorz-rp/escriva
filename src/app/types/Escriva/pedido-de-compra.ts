import { PedidosComprasDTO, PedidoCompraDTO } from "../Bling/pedidos-de-compra";
import { Produto, converterComprasItemDTO } from "./produto";

export type PedidoDeCompra = {
	id: number;
	numero: number;
	data: Date;
	fornecedor: number;
	situacao: number;
	itens: Produto[];
};

export const converterPedidosComprasDTO = (
	dto: PedidosComprasDTO
): PedidoDeCompra => ({
	id: dto.id,
	numero: dto.numero,
	data: dto.data,
	fornecedor: dto.fornecedor.id,
	situacao: dto.situacao.valor,
	itens: [],
});

export const converterPedidoCompraDTO = (
	dto: PedidoCompraDTO
): PedidoDeCompra => ({
	id: dto.id,
	numero: dto.numero,
	data: dto.data,
	fornecedor: dto.fornecedor.id,
	situacao: dto.situacao.valor,
	itens: dto.itens.map((item) => converterComprasItemDTO(item)),
});
