"use client";
import React from "react";

import FetchFromBling from "@/app/components/Buttons/fetch-from-bling";
import FetchFromDB from "@/app/components/Buttons/fetch-from-db";
import { getPedidosComItens } from "../lib/bling/pedidos-de-venda";

export default function SellOrders() {
	async function fetchFromBling() {
		const newData = await getPedidosComItens({});
		console.log(newData);
	}

	return (
		<div>
			<div className="flex">
				<div className="flex-1">
					<h1 className="flex mb-4 text-xl md:text-2xl">Pedidos de Venda</h1>
				</div>
				<div className="flex-1">
					<button onClick={fetchFromBling}>Blingar</button>
					<FetchFromBling />
					<FetchFromDB />
				</div>
			</div>
			<div>
				<div> Situações</div>
				<div>
					<div className="flex">
						<p>Em aberto</p>
						<input type="checkbox" name="emAberto" />
					</div>
					<div className="flex">
						<p>Atendido</p>
						<input type="checkbox" name="atendido" />
					</div>
					<div className="flex">
						<p>Atendido 2</p>
						<input type="checkbox" name="atendido2" />
					</div>
					<div className="flex">
						<p>Em andamento</p>
						<input type="checkbox" name="emAndamento" />
					</div>
					<div className="flex">
						<p>Em andamento 2</p>
						<input type="checkbox" name="emAndamento2" />
					</div>
					<div className="flex">
						<p>Reservado</p>
						<input id="reservado" type="checkbox" />
					</div>
				</div>
				<div>Data</div>
			</div>
		</div>
	);
}
