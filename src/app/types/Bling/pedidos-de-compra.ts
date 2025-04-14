export type PedidosComprasDTO = {
	id: number;
	numero: number;
	data: Date;
	dataPrevista: string;
	totalProdutos: number;
	total: number;
	fornecedor: PedidosComprasFornecedorDTO;
	situacao: PedidosComprasSituacaoDTO;
};

export type PedidoCompraDTO = {
	id: number;
	numero: number;
	data: Date;
	dataPrevista: Date;
	totalProdutos: number;
	total: number;
	fornecedor: PedidosComprasFornecedorDTO;
	situacao: PedidosComprasSituacaoDTO;
	ordemCompra: string;
	observacoes: string;
	observacoesInternas: string;
	desconto: PedidosComprasDescontoDTO;
	categoria: PedidosComprasCategoriaDTO;
	tributacao: PedidosComprasTributacaoDTO;
	transporte: PedidosComprasTransporteDTO;
	itens: Array<PedidosComprasItemDTO>;
	parcelas: Array<PedidosComprasParcelaDTO>;
};

type PedidosComprasFornecedorDTO = {
	id: number;
};

type PedidosComprasSituacaoDTO = {
	valor: number;
};

type PedidosComprasDescontoDTO = {
	valor: number;
	unidade: string;
};

type PedidosComprasCategoriaDTO = {
	id: number;
};

type PedidosComprasTributacaoDTO = {
	totalICMS: number;
	totalIPI: number;
};

type PedidosComprasTransporteDTO = {
	frete: number;
	transportador: string;
	fretePorConta: number;
	pesoBruto: number;
	volumes: number;
};

export type PedidosComprasItemDTO = {
	descricao: string;
	codigoFornecedor: string;
	unidade: string;
	valor: number;
	quantidade: number;
	aliquotaIPI: number;
	descricaoDetalhada: string;
	produto: PedidosComprasProdutoDTO;
};

type PedidosComprasParcelaDTO = {
	valor: number;
	dataVencimento: string;
	observacao: string;
	formaPagamento: PedidosComprasFormaPagamentoDTO;
};

type PedidosComprasProdutoDTO = {
	id: number;
	codigo: string;
};

type PedidosComprasFormaPagamentoDTO = {
	id: number;
};
