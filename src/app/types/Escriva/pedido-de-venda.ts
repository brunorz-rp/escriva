import { PedidosVendasDTO, PedidoVendaDTO } from "../Bling/pedido-de-venda";
import { converterVendasItemDTO, Produto } from "./produto";

export type PedidoDeVenda = {
	id: number;
	numero: number;
	data: Date;
	comprador?: string;
	situacao: number;
	itens?: Produto[];
};

export const converterPedidosVendasDTO = (
	dto: PedidosVendasDTO
): PedidoDeVenda => ({
	id: dto.id,
	numero: dto.numero,
	data: dto.data,
	comprador: dto.contato?.nome,
	situacao: dto.situacao.valor,
	itens: [],
});

export const converterPedidoVendaDTO = (
	dto: PedidoVendaDTO
): PedidoDeVenda => ({
	id: dto.id,
	numero: dto.numero,
	data: dto.data,
	comprador: dto.contato?.nome,
	situacao: dto.situacao.valor,
	itens: dto.itens.map((vendaItemDTO) => converterVendasItemDTO(vendaItemDTO)),
});
