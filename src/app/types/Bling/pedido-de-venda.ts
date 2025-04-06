export type PedidosVendasDTO = {
	id: number;
	numero: number;
	numeroLoja: string;
	data: Date;
	dataSaida: string;
	dataPrevista: string;
	totalProdutos: number;
	total: number;
	contato: VendasContatoDTO;
	situacao: VendasSituacaoDTO;
	loja: VendasLojaDTO;
};

export type PedidoVendaDTO = {
	id: number;
	numero: number;
	numeroLoja: string;
	data: Date;
	dataSaida: string;
	dataPrevista: string;
	totalProdutos?: number;
	total?: number;
	contato: VendasContatoDTO;
	situacao: VendasSituacaoDTO;
	loja?: VendasLojaDTO;
	numeroPedidoCompra?: string;
	outrasDespesas?: number;
	observacoes?: string;
	observacoesInternas?: string;
	desconto?: VendasDescontoDTO;
	categoria?: VendasCategoriaDTO;
	notaFiscal?: VendasNotaFiscalDTO;
	tributacao?: VendasTributacaoDTO;
	itens: VendasItemDTO[];
	parcelas: VendasParcelaDTO[];
	tarnsporte?: VendasTransporteDTO;
	vendedor?: VendasVendedorDTO;
	intermediador?: VendasIntermediadorDTO;
	taxas?: VendasTaxaDTO;
};

type VendasContatoDTO = {
	id: number;
	nome: string;
	tipoPessoa?: string;
	numeroDocumento?: string;
};

type VendasSituacaoDTO = {
	id: number;
	valor: number;
};

type VendasLojaDTO = {
	id: number;
};

type VendasDescontoDTO = {
	valor: number;
	unidade: string;
};

type VendasCategoriaDTO = {
	id: number;
};

type VendasNotaFiscalDTO = {
	id: number;
};

type VendasTributacaoDTO = {
	totalICMS: number;
	totalIPI: number;
};

export type VendasItemDTO = {
	id: number;
	codigo?: string;
	unidade?: string;
	quantidade: number;
	desconto?: number;
	valor: number;
	aliquotaIPI?: number;
	descricao: string;
	descricaoDetalhada: string;
	produto: VendasItemProdutoDTO;
	comissao: VendasItemComissaoDTO;
};

type VendasItemProdutoDTO = {
	id: number;
};

type VendasItemComissaoDTO = {
	base?: number;
	aliquota?: number;
	valor?: number;
};

type VendasParcelaDTO = {
	id: number;
	dataVencimento: Date;
	valor: number;
	observacoes: string;
	formaPagamento: VendasParcelaFormaPagamentoDTO;
};

type VendasParcelaFormaPagamentoDTO = {
	id: number;
};

type VendasTransporteDTO = {
	fretePorConta?: number;
	frete?: number;
	quantidadeVolumes?: number;
	pesoBruto?: number;
	prazoEntrega?: number;
	contato?: VendasTransporteContatoDTO;
	etiqueta?: VendasTransporteEtiquetaDTO;
	volumes?: VendasTransporteVolumeDTO;
};

type VendasTransporteContatoDTO = {
	id: number;
	nome: string;
};

type VendasTransporteEtiquetaDTO = {
	nome: string;
	endereco: string;
	numero: string;
	complemento: string;
	municipio: string;
	uf: string;
	cep: string;
	bairo: string;
	nomePais: string;
};

type VendasTransporteVolumeDTO = {
	id: number;
	servico: string;
	codigoRastreamento?: string;
};

type VendasVendedorDTO = {
	id: number;
};

type VendasIntermediadorDTO = {
	cnpj: string;
	nomeUsuario: string;
};

type VendasTaxaDTO = {
	taxaComissao: number;
	custoFrete: number;
	valorBase: number;
};
