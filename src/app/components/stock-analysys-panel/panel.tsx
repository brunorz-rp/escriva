import ProductsQuantityPerColorPanel from "../product-quantity-per-color-panel/panel";

export default function Analyze() {
	return (
		<div className="flex m-12">
			<ProductsQuantityPerColorPanel />
			<div></div>
			<ProductsQuantityPerColorPanel />
		</div>
	);
}
