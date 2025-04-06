"use client";

import ProductsByColorsPanel from "../components/ProductsByColorsPanel/panel";

export default function Camila() {
	return (
		<>
			<div className="flex">
				<ProductsByColorsPanel />
				<ProductsByColorsPanel />
			</div>
		</>
	);
}
