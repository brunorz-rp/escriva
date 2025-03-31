import { PedidosComprasDTO } from "../Bling/pedidos-de-compra";

export type PedidoDeCompra = {
	id: number;
	numero: number;
	data: Date;
	fornecedor: number;
	situacao: number;
};

export const transformPedido = (pedido: PedidosComprasDTO): PedidoDeCompra => ({
	id: pedido.id,
	numero: pedido.numero,
	data: pedido.data,
	fornecedor: pedido.fornecedor.id,
	situacao: pedido.situacao.valor
  });