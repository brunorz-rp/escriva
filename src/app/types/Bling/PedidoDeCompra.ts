import { Fornecedor } from "./Fornecedor";

export type PedidoDeCompra = {
	id: number;
	numero: number;
	data: string;
	dataPrevista: string;
	totalProdutos: number;
	total: number;
	fornecedor: Fornecedor;
	situacao: Situacao;
};

type Situacao = {
	valor: number
}