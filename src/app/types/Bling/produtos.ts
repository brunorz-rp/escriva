import { EstoqueGetAllResponseDTO } from "./estoque";
import { ProdutoFornecedorDTO } from "./fornecedor";

export type ProdutosDadosBaseDTO = {
	id: number;
	idProdutoPai?: number;
	codigo: string;
	nome: string;
	preco?: number;
	precoCusto?: number;
	estoque?: EstoqueGetAllResponseDTO;
	tipo: string;
	situacao: string;
	formato: string;
	descricaoCurta?: string;
	imagemURL?: string;
};

export type ProdutosDadosDTOEspecial = {
	id: number;
	nome?: string;
	codigo?: string;
	preco?: number;
	precoNovo?: number;
	tipo?: string;
	situacao?: string;
	formato?: string;
	descricaoCurta?: string;
	dataValidade?: Date;
	pesoLiquido?: number;
	pesoLiquidoNovo?: number;
	pesoBruto?: number;
	volumes?: number;
	itensPorCaixa?: number;
	gtin?: string;
	gtinEmbalagem?: string;
	tipoProducao?: string;
	condicao?: number;
	freteGratis?: boolean;
	marca?: string;
	descricaoComplementar?: string;
	linkExterno?: string;
	observacoes?: string;
	descricaoEmbalagemDiscreta?: string;
	categoria?: ProdutosCategoriaDTO;
	estoque?: ProdutosEstoqueDTO;
	fornecedor?: ProdutoFornecedorDTO;
	actionEstoque?: string;
	dimensoes?: ProdutosDimensoesDTO;
	tributacao?: ProdutosTributacaoDTO;
	midia?: ProdutosMidiaDTO;
	linhaProduto?: ProdutosLinhaProdutoDTO;
	estrutura?: ProdutoEstruturaDTO;
	camposCustomizados?: ProdutosCampoCustomizadoDTO;
	variacoes?: ProdutosVariacaoDTO;
};

export type ProdutosDadosDTO = {
	id: number;
	nome?: string;
	codigo?: string;
	preco?: number;
	tipo?: string;
	situacao?: string;
	formato?: string;
	descricaoCurta?: string;
	dataValidade?: Date;
	pesoLiquido?: number;
	pesoBruto?: number;
	volumes?: number;
	itensPorCaixa?: number;
	gtin?: string;
	gtinEmbalagem?: string;
	tipoProducao?: string;
	condicao?: number;
	freteGratis?: boolean;
	marca?: string;
	descricaoComplementar?: string;
	linkExterno?: string;
	observacoes?: string;
	descricaoEmbalagemDiscreta?: string;
	categoria?: ProdutosCategoriaDTO;
	estoque?: ProdutosEstoqueDTO;
	fornecedor?: ProdutoFornecedorDTO;
	actionEstoque?: string;
	dimensoes?: ProdutosDimensoesDTO;
	tributacao?: ProdutosTributacaoDTO;
	midia?: ProdutosMidiaDTO;
	linhaProduto?: ProdutosLinhaProdutoDTO;
	estrutura?: ProdutoEstruturaDTO;
	camposCustomizados?: ProdutosCampoCustomizadoDTO;
	variacoes?: ProdutosVariacaoDTO;
};

type ProdutosCategoriaDTO = {
	id: number;
};

type ProdutosEstoqueDTO = {
	minimo?: number;
	maximo?: number;
	crossdocking?: number;
	localizacao?: string;
	saldoVirtualTotal?: number;
};

type ProdutosDimensoesDTO = {
	largura?: number;
	altura?: number;
	profundidade?: number;
	unidadeMedida?: number;
};

type ProdutosTributacaoDTO = unknown;

type ProdutosMidiaDTO = unknown;

type ProdutosLinhaProdutoDTO = {
	id: number;
};

type ProdutoEstruturaDTO = unknown;

type ProdutosCampoCustomizadoDTO = unknown;

type ProdutosVariacaoDTO = {
	id?: number;
	nome?: string;
	codigo?: string;
	preco?: number;
	tipo?: string;
	situacao?: string;
	formato?: string;
	descricaoCurta?: string;
	dataValidade?: Date;
	pesoLiquido?: number;
	pesoBruto?: number;
	volumes?: number;
	itensPorCaixa?: number;
	gtin?: string;
	gtinEmbalagem?: string;
	tipoProducao?: string;
	condicao?: number;
	freteGratis?: boolean;
	marca?: string;
	descricaoComplementar?: string;
	linkExterno?: string;
	observacoes?: string;
	descricaoEmbalagemDiscreta?: string;
	categoria?: ProdutosCategoriaDTO;
	estoque?: ProdutosEstoqueDTO;
	fornecedor?: ProdutoFornecedorDTO;
	actionEstoque?: string;
	dimensoes?: ProdutosDimensoesDTO;
	tributacao?: ProdutosTributacaoDTO;
	midia?: ProdutosMidiaDTO;
	linhaProduto?: ProdutosLinhaProdutoDTO;
	estrutura?: ProdutoEstruturaDTO;
	camposCustomizados?: ProdutosCampoCustomizadoDTO;
	variacao?: ProdutosVariacaoDadosDTO;
};

type ProdutosVariacaoDadosDTO = {
	nome?: string;
	ordem?: number;
	produtoPai?: ProdutosProdutoPaiDTO;
};

type ProdutosProdutoPaiDTO = {
	id: number;
	cloneInfo?: boolean;
};
