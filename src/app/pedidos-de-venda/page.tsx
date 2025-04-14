"use client";

import { useState } from "react";

export default function SellOrders() {
	const [checkboxValues, setCheckboxValues] = useState({
		emAberto: false,
		atendido: false,
		atendido2: false,
		emAndamento: true,
		emAndamento2: true,
		reservado: true,
	});

	// Update checkbox state
	function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, checked } = event.target;
		setCheckboxValues((prev) => ({ ...prev, [name]: checked }));
	}

	return (
		<div>
			<div className="flex">
				<div className="flex-1">
					<h1 className="flex mb-4 text-xl md:text-2xl">Pedidos de Venda</h1>
				</div>
			</div>
			<div>
				<div> Situações</div>
				<div>
					<div className="flex">
						<input
							type="checkbox"
							name="emAberto"
							checked={checkboxValues.emAberto}
							onChange={handleCheckboxChange}
						/>
						<p>Em aberto</p>
					</div>
					<div className="flex">
						<input
							type="checkbox"
							name="atendido"
							checked={checkboxValues.atendido}
							onChange={handleCheckboxChange}
						/>
						<p>Atendido</p>
					</div>
					<div className="flex">
						<input
							type="checkbox"
							name="atendido2"
							checked={checkboxValues.atendido2}
							onChange={handleCheckboxChange}
						/>
						<p>Atendido 2</p>
					</div>
					<div className="flex">
						<input
							type="checkbox"
							name="emAndamento"
							checked={checkboxValues.emAndamento}
							onChange={handleCheckboxChange}
						/>
						<p>Em andamento</p>
					</div>
					<div className="flex">
						<input
							type="checkbox"
							name="emAndamento2"
							checked={checkboxValues.emAndamento2}
							onChange={handleCheckboxChange}
						/>
						<p>Em andamento 2</p>
					</div>
					<div className="flex">
						<input
							id="reservado"
							type="checkbox"
							name="reservado"
							checked={checkboxValues.reservado}
							onChange={handleCheckboxChange}
						/>
						<p>Reservado</p>
					</div>
				</div>
			</div>
		</div>
	);
}
