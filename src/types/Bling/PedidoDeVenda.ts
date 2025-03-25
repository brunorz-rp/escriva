export type PedidoDeVenda = {
	id: number;
	numero: number;
	numeroLoja: string;
	data: string;
	dataSaida: string;
	dataPrevista: string;
	totalProdutos: number;
	total: number;
	contato: Contato;
	situacao: Situacao;
	loja: Loja;
};

type Contato = {
	id: number;
	nome: string;
	tipoPessoa: string;
	numeroDocumento: string;
};

type Situacao = {
	id: number;
	valor: number;
};

type Loja = {
	id: number;
};
