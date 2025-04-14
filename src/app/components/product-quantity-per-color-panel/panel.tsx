"use client";

export default function ProductsQuantityPerColorPanel() {
	const placeholderData = [
		["BRU-007", 21, 7, 94, "Julia"],
		["JUL-124", 10, 3, 3, "Linda"],
	];

	return (
		<div className="bg-blue-50 m-1 w-auto text-center rounded-md">
			<div>Escolha do Filtro</div>
			<div>Filtro</div>
			<div
				className="grid grid-cols-5 min-w-full"
				style={{
					gridTemplateColumns: "repeat(5, minmax(94px, auto)",
				}}
			>
				<div>Branco</div>
				<div>Preto</div>
				<div>Natural</div>
				<div>Amadeirado</div>
				<div>Anodizado</div>
				{placeholderData.map((dataAbove) =>
					dataAbove.map((dataBelow, keyBelow) => (
						<div key={keyBelow}>{dataBelow}</div>
					))
				)}
			</div>
		</div>
	);
}
