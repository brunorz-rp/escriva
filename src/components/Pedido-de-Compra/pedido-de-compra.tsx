import React from "react";
import { PedidoDeCompra } from "@/types/Escriva/PedidoDeCompra";

interface PedidoDeCompraCardProperties {
	pedido: PedidoDeCompra;
}

const PedidoDeCompraCard = ({ pedido }: PedidoDeCompraCardProperties) => {
	return (
		<div className="bg-blue-300 p-1 rounded-md">
			<div className="flex">
				<div className="">{pedido.numero}</div>
				<div className="">{pedido.data.toString()}</div>
			</div>
			<div className="bg-white">
				<p>BG-101</p>
				<p>BG-022</p>
				<p>BG-330</p>
			</div>
		</div>
	);
};

export default PedidoDeCompraCard;
