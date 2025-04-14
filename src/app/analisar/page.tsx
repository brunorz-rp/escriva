import ProductsQuantityPerColorPanel from "../components/product-quantity-per-color-panel/panel";

export default function Analyze() {
	return (
		<div className="flex m-12">
			<ProductsQuantityPerColorPanel />
			<div>painel adicionar</div>
			<ProductsQuantityPerColorPanel />
		</div>
	);
}
