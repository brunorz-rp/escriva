import { ProdutoPai } from "@/app/types/Escriva/produto-pai";

export default function ProductQuantityPerColorRow({
	anchor,
	produtoPai,
}: {
	anchor: number;
	produtoPai: ProdutoPai;
}) {
	return (
		<>
			{anchor === 0 && (
				<td className="bg-blue-100" key={produtoPai.codigo}>
					{produtoPai.codigo}
				</td>
			)}
			<td>{produtoPai.branco?.quantidade || ""}</td>
			<td>{produtoPai.preto?.quantidade || ""}</td>
			<td>{produtoPai.natural?.quantidade || ""}</td>
		</>
	);
}
