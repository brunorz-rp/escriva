import { PedidosVendasDTO, PedidoVendaDTO } from "../Bling/pedido-de-venda";
import { Produto, converterVendasItemDTO } from "./produto";

export type PedidoDeVenda = {
	id: number;
	numero: number;
	data: Date;
	contato?: string;
	situacao: number;
	itens: Produto[];
};

export const converterPedidosVendasDTO = (
	dto: PedidosVendasDTO
): PedidoDeVenda => ({
	id: dto.id,
	numero: dto.numero,
	data: dto.data,
	contato: dto.contato?.nome,
	situacao: dto.situacao.id,
	itens: [],
});

export const converterPedidoVendaDTO = (
	dto: PedidoVendaDTO
): PedidoDeVenda => ({
	id: dto.id,
	numero: dto.numero,
	data: dto.data,
	contato: dto.contato?.nome,
	situacao: dto.situacao.id,
	itens: dto.itens.map((item) => converterVendasItemDTO(item)),
});
